require('dotenv').config();

module.exports = {
    app : require('./app'),
    mongodb : require('./mongodb'),
    mail : require('./mail'),
    socket : require('./socket'),
}