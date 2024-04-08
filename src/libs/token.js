const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const logger = require('../common/logger');

exports.generateToken = (account) => {
    const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength : 4096
    });

    const token = jwt.sign(account, privateKey, {
        algorithm: 'RS256',
        expiresIn: '180d'
    });

    return {
        token,
        publicKey
    }
}

exports.generateIDToken = (id) => {
    const token = jwt.sign({id}, config.get('app.secretKey'), {
        expiresIn: '180d'
    });

    return token;
}

exports.verifyToken = (token, publicKey) => {
    let account;
    jwt.verify(token, publicKey, (err, data) => {
        if(err) {
            logger.error(err);
            return undefined;
        }
        account = data.account;
    });
    return account;
}

exports.verifyIDToken = (token) => {
    let id;
    jwt.verify(token, config.get('app.secretKey'), (err, data) => {
        if(err) {
            logger.error(err);
            return undefined;
        }
        id = data.id;
    })
    return id;
}