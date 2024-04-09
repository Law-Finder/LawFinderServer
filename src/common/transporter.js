const nodemailer = require('nodemailer');
const config = require('config');
const ejs = require('ejs');
const path = require('path');
const logger = require('./logger');

module.exports = async (req, subject, mail) => {
    try {
        const viewPath = req.app.get('views');
        const html = await ejs.renderFile(path.join(viewPath, 'gmail.ejs'), { mail });
        await nodemailer.createTransport(config.get('mail')).sendMail({
            to: mail,
            from: '"Law Finder Company" <yukipham0702@gmail.com>',
            subject,
            html
        });
        logger.debug(`Sent mail to ${mail} successfully`);
    } catch (err) {
        logger.error(err);
    }
}