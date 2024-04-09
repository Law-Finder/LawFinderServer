const response = require('../responses/response');
const transporter = require('../../common/transporter');

exports.login = async (req, res) => {
    res.status(200).json(response.commandResponse("success"));
    const mail = 'phamthanhlap2003.hha@gmail.com';
    const subject = 'Xác nhận mail';
    await transporter(req, subject, mail);
}