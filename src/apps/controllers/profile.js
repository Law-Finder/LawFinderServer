const UoW = require('../models/UoW');
const response = require('../responses/response');
const setting = require('../../common/setting');

exports.profile = async (req, res) => {
    const role = req.account.role;
    const id = req.id;
    try {
        var data;
        if(role == setting.LAWER) {
            data = await UoW.LawerModel.findOne({account_id : id});
        }
        else data = await UoW.UserModel.findOne({account_id : id});
        res.status(200).json(response.dataResponse(data));
    }catch (err) {
        res.status(500).json(response.exceptionResponse('Server has error can\'t get profile'));
    }
}