var validator = require('validator');
var nodemailer = require('nodemailer');
var config = require('config');
var mailConfig = config.get('mailConfig');
var transporter = nodemailer.createTransport(mailConfig.transport);

module.exports = {

    // Check if mail adress is valid
    checkMail: function (req, callback) {
        // if it's, mailOptions is filled with passed data
        if ((validator.isEmail(req.body.email)) && (req.body.email !== '')) {
            var mailOptions = {
                from: mailConfig.transport.auth.user,
                to: mailConfig.to,
                subject: validator.escape(req.body.subject),
                html: validator.escape(req.body.name) +
                '<br>' + validator.escape(req.body.email) +
                '<br>' + validator.escape(req.body.message)
            };
            callback(mailOptions);
        }
        // if it's not, mailOptions is empty
        else {
            var mailOptions = null;
            callback(mailOptions);
        }
    },
    // Send the mail, if not possible passes FALSE to callback
    sendMail: function (mailOptions, callback) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                callback(false);
            } else {
                console.log('Email sent: ' + info.response);
                callback(true);
            }
        });
    }
}