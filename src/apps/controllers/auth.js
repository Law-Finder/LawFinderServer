const response = require('../responses/response');
const transporter = require('../../common/transporter');
const file = require('../../common/constant').GMAIL;
const subject = require('../../common/constant').CONFIRM_SUBJECT;

exports.login = async (req, res) => {
    res.status(200).json(response.commandResponse("success"));
    const mail = 'phamthanhlap2003.hha@gmail.com';
    await transporter.sendByTemplate(req, subject, mail, file);
}

exports.register = async (req, res) => {
    const {email, password, infor} = req.body;

}