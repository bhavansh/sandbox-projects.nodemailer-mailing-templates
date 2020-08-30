

require('dotenv').config();

const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require('path')
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL , // Add your gmail account 
        pass: process.env.PASSWORD  // Add your gmail password
    }
});

// Step 2
log(path.join(__dirname,'views','test.ejs'));
// Loggin the path just to be sure

// Rendering ejs template for sending email template
// I have used a prebuilt email template for this
ejs.renderFile(path.join(__dirname,'views','test.ejs'), function (err, data) {
    if (err) {
        console.log(err);
    } else {
        let mailOptions = {
            from: 'abc@gmail.com', //  email sender
            to: 'xyz@gmail.com',
            cc: 'abcxyz@gmail.com', // email receiver
            subject: 'Nodemailer - Test',
            text: 'Wooohooo it works!!',
            html :data
        };
        console.log("Sending ,mail ======================>");
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }
});

