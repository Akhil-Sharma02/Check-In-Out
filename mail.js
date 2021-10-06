const sgMail = require('@sendgrid/mail');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const API_KEY = process.env.API_KEY;
sgMail.setApiKey(API_KEY);
const fromMail = process.env.FROM_EMAIL;

const sendMail = function (req, todayDate, currentTime, isAvailable) {
    let msg;
    if(isAvailable){
        msg = {
            to: req.email,
            from: {
                name: 'Company',
                email: fromMail
            },
            subject: 'Checked In',
            text: req.name + ', you just checked in at ' + currentTime + ' on ' + todayDate + '.',
        };
    }else{
        msg = {
            to: req.email,
            from: {
                name: 'Company',
                email: fromMail
            },
            subject: 'Checked Out',
            text: req.name + ', you just checked out at ' + currentTime + ' on ' + todayDate + '.',
        };
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });
}


module.exports = sendMail;