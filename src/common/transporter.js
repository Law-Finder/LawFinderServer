const nodemailer = require('nodemailer');
const config = require('config');
const ejs = require('ejs');
const path = require('path');
const logger = require('./logger');
const host = require('./setting').HOST;

exports.sendByTemplate = async (req, subject, data, file) => {
    try {
        const viewPath = req.app.get('views');
        const html = await ejs.renderFile(path.join(viewPath, file), { ...data });
        await nodemailer.createTransport(config.get('mail')).sendMail({
            to: data.email,
            from: host,
            subject,
            html
        });
        logger.debug(`Sent mail to ${data.email} successfully`);
    } catch (err) {
        logger.error(err);
    }
}

exports.send = async (subject, mail, text) => {
    try {
        await nodemailer.createTransport(config.get('mail')).sendMail({
            to: mail,
            from: host,
            subject,
            text,
        });
        logger.debug(`Sent mail to ${mail} successfully`);
    }catch (err) {
        logger.error(err);
    }
}