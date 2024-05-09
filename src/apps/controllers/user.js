const response = require('../responses/response');
const UoW = require('../models/UoW');
const fileaction = require('../../libs/fileaction');

exports.getAllUsers = async (req, res) => {
    var {page, limit} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = limit*(page-1);
    const query = {page, limit};
    try {
        const users = await UoW.UserModel.find().skip(skip).limit(limit);
        res.status(200).json(await response.listResponse(UoW.UserModel, query, users));
    }catch(err) {
        res.status(500).json(response.exceptionResponse("Server has error can't get all users"));
    }
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UoW.UserModel.findOne({account_id: id}).populate({path : "account_id"});
        const role = await UoW.UserRoleModel.findOne({account_id: id}).populate({path : "role_id"});
        const data = {user, role};
        if(user && role) {
            res.status(200).json(response.dataResponse(data));
        }else res.status(404).json(response.exceptionResponse(`Account with id ${id} does not exist`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse(`Server has error can't get id ${id}`));
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const {body , file} = req;
    try {
        const account = await UoW.UserModel.findOne({account_id : id});
        if(account) {
            const user = {
                first_name : body.first_name,
                last_name : body.last_name,
                full_name : body.last_name + ' ' + body.first_name,
                gender : body.gender,
                phone : body.phone,
                identity_card : body.identity_card,
                address : body.address
            }
            if(file) {
                fileaction.unlinkFile(account.avatar);
                const avatar = fileaction.saveFile(file, id);
                user["avatar"] = avatar;
            }
            await account.updateOne(user);
            res.status(200).json(response.commandResponse(`Update infor user with id ${id} sucessfully`));
        }else res.status(404).json(response.exceptionResponse(`Account with id ${id} does not exist`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse(`Server has error can't update id ${id}`));
    }
}

exports.updateRole = async (req,res) => {
    const id = req.params.id;
    const role_id = req.body.role_id;
    try {
        const userRole = await UoW.UserRoleModel.findOne({account_id: id});
        if(userRole) {
            await userRole.updateOne({role_id: role_id});
            res.status(200).json(response.commandResponse(`Update role for user with id ${id} sucessfully`));
        }else res.status(404).json(response.exceptionResponse(`Account with id ${id} does not exist`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse(`Server has error can't update role for id ${id}`));
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UoW.UserModel.findByIdAndDelete({account_id: id});
        if(user) {
            await UoW.AccountModel.deleteOne({account_id: id});
            await UoW.UserRoleModel.deleteOne({account_id: id});
            res.status(200).json(response.command(`Delete user with id ${id} successfully`));
        }else res.status(404).json(response.exceptionResponse(`Account with id ${id} does not exist`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse(`Server has error can't delete user with id ${id}`));
    }
}