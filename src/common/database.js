const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

module.exports = () => {
    mongoose
        .connect(config.get("mongodb.uri"))
        .then(() => logger.warn('Connected!!!'))
        .catch((err) => logger.error(err));
    return mongoose;
}