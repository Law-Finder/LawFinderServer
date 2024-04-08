const bcrypt = require('bcrypt');
const logger = require('../common/logger');

exports.hash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }catch(err) {
        logger.error(err);
        return '';
    }
}

exports.verify = async (password, dbPassword) => {
    try {
        return await bcrypt.compare(password, dbPassword);
    }catch(err) {
        logger.error(err);
        return false;
    }
}