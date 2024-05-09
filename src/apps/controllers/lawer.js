const response = require('../responses/response');
const UoW = require('../models/UoW');
const fileaction = require('../../libs/fileaction');

exports.getAllLawers = async (req, res) => {
    var {page, limit} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = limit*(page-1);
    const query = {page, limit};
    try {
        const Lawers = await UoW.LawerModel.find().skip(skip).limit(limit);
        res.status(200).json(await response.listResponse(UoW.LawerModel, query, Lawers));
    }catch(err) {
        res.status(500).json(response.exceptionResponse("Server has error can't get all Lawers"));
    }
}

exports.getLawerById = async (req, res) => {
    const id = req.params.id;
    try {
        const lawer = await UoW.LawerModel.findOne({account_id: id}).populate({path : "account_id"});
        const role = await UoW.UserRoleModel.findOne({account_id: id}).populate({path : "role_id"});
        const data = {lawer, role};
        if(lawer && role) {
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
        const account = await UoW.LawerModel.findOne({account_id : id});
        if(account) {
            const Lawer = {
                first_name : body.first_name,
                last_name : body.last_name,
                full_name : body.last_name + ' ' + body.first_name,
                gender : body.gender,
                phone : body.phone,
                identity_card : body.identity_card,
                address : body.address,
                profile : body.profile
            }
            if(file) {
                fileaction.unlinkFile(account.avatar);
                const avatar = fileaction.saveFile(file, id);
                Lawer["avatar"] = avatar;
            }
            await account.updateOne(Lawer);
            res.status(200).json(response.commandResponse(`Update infor Lawer with id ${id} sucessfully`));
        }else res.status(404).json(response.exceptionResponse(`Account with id ${id} does not exist`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse(`Server has error can't update id ${id}`));
    }
}


exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const Lawer = await UoW.LawerModel.findByIdAndDelete({account_id: id});
        if(Lawer) {
            await UoW.AccountModel.deleteOne({account_id: id});
            await UoW.UserRoleModel.deleteOne({account_id: id});
            res.status(200).json(response.command(`Delete Lawer with id ${id} successfully`));
        }else res.status(404).json(response.exceptionResponse(`Account with id ${id} does not exist`));
    }catch(err) {
        res.status(500).json(response.exceptionResponse(`Server has error can't delete Lawer with id ${id}`));
    }
}