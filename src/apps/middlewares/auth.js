const token = require('../../libs/token');
const response = require('../responses/response');

exports.authentication = (req , res , next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    const idToken = req.headers.token.split(' ')[1] ;
    if(accessToken && idToken) {
        const id = token.verifyIDToken(idToken);
        const account = token.verifyToken(accessToken, 'publickey');
        if(id && account) {
            req.account = account;
            req.id = id;
            next();
        }
        res.status(500).json(response.exceptionResponse('Token is experied or has error when authorization'));
    }
    res.status(401).json(response.exceptionResponse('Token isn\'t valid'));
}

exports.adminAuthorization = (req, res, next) => {

}