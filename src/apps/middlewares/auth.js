const token = require('../../libs/token');
const response = require('../responses/response');
const UoW = require('../models/UoW');
const setting = require('../../common/setting');

exports.authentication = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const idToken = req.headers.token.split(' ')[1];
        if (accessToken && idToken) {
            const id = token.verifyIDToken(idToken);
            UoW.AccountModel.findById(id).then((data) => {
                if (data && id) {
                    const account = token.verifyToken(accessToken, data.public_key);
                    req.account = account;
                    req.id = id;
                    next();
                }else res.status(401).json(response.exceptionResponse('Token is experied or has error when authorization'));
            }).catch((err) => {
                res.status(401).json(response.exceptionResponse('Server has error can\'t access token'));
            });
        }
    }catch(err) {
        res.status(401).json(response.exceptionResponse('Token isn\'t valid'));
    }
}

exports.adminAuthorization = (req, res, next) => {
    this.authentication(req, res, () => {
        if (req.account.role == setting.ADMIN) next();
        else {
            res.status(401).json(response.exceptionResponse("You are not admin role, permission denied"));
        }
    });
}

exports.lawerAuthorization = (req, res, next) => {
    this.authentication(req, res, () => {
        if (req.account.role == setting.LAWER) next();
        else {
            res.status(401).json(response.exceptionResponse("You are not lawer role, permission denied"));
        }
    });
}