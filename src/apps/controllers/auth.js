const response = require('../responses/response');
const UoW = require('../models/UoW');
const crypt = require('../../libs/crypt');
const token = require('../../libs/token');
const setting = require('../../common/setting');
const fileaction = require('../../libs/fileaction');
const transporter = require('../../common/transporter');
const { client_domain } = require('../../../config/app');

exports.login = async (req, res) => {
    var { email, password } = req.body;
    try {
        const existing = await UoW.AccountModel.findOne({ email });
        if (existing) {
            const valid = await crypt.verify(password, existing.password);
            if (valid) {
                if (existing.active && existing.active_by_admin) {
                    const user = await UoW.UserRoleModel.findOne({ account_id: existing._id }).populate({ path: "role_id" });
                    var full_name;
                    if (user.role_id.name == setting.LAWER) {
                        full_name = (await UoW.LawerModel.findOne({ email })).full_name;
                    } else {
                        full_name = (await UoW.UserModel.findOne({ email })).full_name;
                    }
                    const account = { email, fullname: full_name, role: user.role_id.name };
                    const publicToken = token.generateToken(account);
                    const accessToken = publicToken.token;
                    const idToken = token.generateIDToken(existing._id);
                    await UoW.AccountModel.findByIdAndUpdate(existing._id, { public_key: publicToken.publicKey, status: true });
                    res.status(200).json(response.authResponse("Login sucessfully", accessToken, idToken));
                } else res.status(400).json(response.exceptionResponse("Account is not active"));
            } else res.status(400).json(response.exceptionResponse("Email or password is incorrect"));
        } else {
            res.status(400).json(response.exceptionResponse("Email or password is incorrect"));
        }
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't login"));
    }
}

exports.register = async (req, res) => {
    var { email, password, infor } = req.body;
    try {
        const existing = await UoW.AccountModel.findOne({ email });
        if (existing) {
            res.status(400).json(response.exceptionResponse("Account already registered"));
        } else {
            infor = { ...infor, full_name: infor.last_name + " " + infor.first_name };
            password = await crypt.hash(password);
            await UoW.AccountModel({ email, password }).save();
            const account_id = (await UoW.AccountModel.findOne({ email }))._id;
            await UoW.UserModel({ email, ...infor, account_id }).save();
            const RoleId = (await UoW.RoleModel.findOne({ name: setting.USER }))._id;
            await UoW.UserRoleModel({ account_id, role_id: RoleId }).save();
            res.status(201).json(response.commandResponse("Create account successfully"));
        }
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't create account"));
    }
}

exports.lawerRegister = async (req, res) => {
    var { email, password, infor } = req.body;
    const { file } = req;
    try {
        const existing = await UoW.AccountModel.findOne({ email });
        if (existing) {
            res.status(400).json(response.exceptionResponse("Account already registered"));
        } else {
            if (file) {
                const certificate = fileaction.saveCertificate(file, email);
                infor = { ...infor, full_name: infor.last_name + " " + infor.first_name , certificate};
                password = await crypt.hash(password);
                await UoW.AccountModel({ email, password }).save();
                const account_id = (await UoW.AccountModel.findOne({ email }))._id;
                await UoW.LawerModel({ email, ...infor, account_id }).save();
                const RoleId = (await UoW.RoleModel.findOne({ name: setting.USER }))._id;
                await UoW.UserRoleModel({ account_id, role_id: RoleId }).save();
                res.status(201).json(response.commandResponse("Create account successfully"));
            } else res.status(400).json(response.exceptionResponse("Not found file certificate"));
        }
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't create account"));
    }
}

exports.active = async (req, res) => {
    const idToken = req.query.token;
    try {
        if (idToken) {
            const id = token.verifyIDToken(idToken);
            const activeUser = await UoW.AccountModel.findById(id);
            if (activeUser) {
                await UoW.AccountModel.findByIdAndUpdate(id, { active: true });
                res.status(200).json(response.commandResponse(`Active account with id ${id} successfully`));
            }
            else res.status(404).json(response.exceptionResponse(`Account not existing`));
        }
        else res.status(404).json(response.exceptionResponse("Can't find token to active account"));
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't active account"));
    }
}

exports.logout = async (req, res) => {
    const idToken = req.query.token;
    try {
        const id = token.verifyIDToken(idToken);
        const logoutUser = await UoW.AccountModel.findById(id);
        if (logoutUser) {
            await UoW.AccountModel.findByIdAndUpdate(id, { status: false, public_key: "" });
            res.status(200).json(response.commandResponse(`Logout account with id ${id} successfully`));
        }
        else res.status(404).json(response.exceptionResponse(`Account not existing`));
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't logout"));
    }
}

exports.forgot = async (req, res) => {
    const { email } = req.body;
    try {
        const existing = await UoW.AccountModel.findOne({ email });
        if (existing) {
            if (existing.active_by_admin && existing.active) {
                const newPassword = token.generatePassword();
                const password = await crypt.hash(newPassword);
                await UoW.AccountModel.findByIdAndUpdate(existing._id, { password });
                res.status(200).json(response.commandResponse(`Reset password for account with email ${email} successfully`));
            } else res.status(400).json(response.exceptionResponse("Account is not active"));
        } else res.status(404).json(response.exceptionResponse("Account isn't found"));
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't forgot password"));
    }
}

exports.change = async (req, res) => {
    const { new_password } = req.body;
    const idToken = req.query.token;
    try {
        const id = token.verifyIDToken(idToken);
        const existing = await UoW.AccountModel.findById(id);
        if (existing) {
            if (existing.active_by_admin && existing.active) {
                const password = await crypt.hash(new_password);
                await UoW.AccountModel.findByIdAndUpdate(id, { password });
                res.status(200).json(response.commandResponse(`Update new password for account with id ${id} successfully`));
            } else res.status(400).json(response.exceptionResponse("Account is not active"));
        } else res.status(404).json(response.exceptionResponse("Account is n't existing"));
    } catch (err) {
        res.status(500).json(response.exceptionResponse("Server has error can't reset password"));
    }
}

