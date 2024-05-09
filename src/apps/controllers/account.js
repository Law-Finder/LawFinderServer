const UoW = require('../models/UoW');
const response = require('../responses/response');
const setting = require('../../common/setting');
const transporter = require('../../common/transporter');
const token = require('../../libs/token');
const { client_domain } = require('../../../config/app');

exports.getInactiveUsers = async (req, res) => {
    try {
        const user = await UoW.UserRoleModel.find({role_id : (await UoW.RoleModel.findOne({name : setting.USER}))}).populate({path : "account_id"});
        var data = user.map((u) => {
            if(!u.account_id.active_by_admin) return u;
        })
        data = {count : data.length, data};
        res.status(200).json(response.dataResponse(data));
    }catch (err) {
        res.status(500).json(response.exceptionResponse('Server has error can\'t get inactive users'));
    }
}

exports.getInactiveLawers = async (req, res) => {
    try {
        const user = await UoW.UserRoleModel.find({role_id : (await UoW.RoleModel.findOne({name : setting.LAWER}))}).populate({path : "account_id"});
        const data = user.map((u) => {
            if(!u.account_id.active_by_admin) return u;
        })
        data = {count : data.length, data};
        res.status(200).json(response.dataResponse(data));
    }catch(err) {
        res.status(500).json(response.exceptionResponse('Server has error can\'t get inactive lawers'));
    }
}

exports.changeActive = async (req, res) => {
    const id = req.params.id;
    try {
        const account = await UoW.AccountModel.findById(id);
        if(account) {
            await account.updateOne({active_by_admin : true});
            res.status(200).json(response.commandResponse(`Active accoutn with id ${id} successfully`));
            var idtoken = token.generateIDToken(account._id);
            const data = {client_domain, client_active_domain : `${client_domain}/active?token=${idtoken}`, email : account.email};
            await transporter.sendByTemplate(req, setting.CONFIRM_SUBJECT, data , setting.GMAIL);
        }else res.status(404).json(response.exceptionResponse(`Accoutn is n\'t existing`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse('Server has error can\'t get accitve accout'));
    }
}