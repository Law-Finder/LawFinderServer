const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const logger = require('../common/logger');

exports.generateToken = (account) => {
    const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength : 4096
    });
    const key = publicKey.export({ type: 'pkcs1', format: 'pem' });
    const token = jwt.sign(account, privateKey, {
        algorithm: 'RS256',
        expiresIn: '180d'
    });

    return {
        token,
        publicKey : key,
    }
}

exports.generateIDToken = (id) => {
    const token = jwt.sign({id}, config.get('app.secretKey'), {
        expiresIn: '180d'
    });

    return token;
}

exports.verifyToken = (token, key) => {
    let account;
    const publicKey = crypto.createPublicKey(key);
    jwt.verify(token, publicKey, (err, data) => {
        if(err) {
            logger.error(err.name + " "+ err.message);
            return undefined;
        }
        account = data;
    });
    return account;
}

exports.verifyIDToken = (token) => {
    let id;
    jwt.verify(token, config.get('app.secretKey'), (err, data) => {
        if(err) {
            logger.error(err.name + " "+ err.message);
            return undefined;
        }
        id = data.id;
    })
    return id;
}

exports.generatePassword = () => {
    return crypto.randomBytes(Math.ceil(3)).toString('hex').slice(0, 6);
}