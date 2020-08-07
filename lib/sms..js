
const twilio = require("twilio");
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

const SNS = new AWS.SNS();


// exports.sendMsg = function (body, number, callback) {
//     client.messages.create({
//         to: number,
//         from: process.env.TWILIO_SEND_NUMBER,
//         body: body
//     }, function (err, message) {
//         if (err) {
//             console.log(err);
//             callback(err, message);
//         } else {
//             callback(null, message);
//         }
//     })

// }

exports.sendMsg = function (body, number, callback) {
    const msgParam = {
        Message: body,
        MessageStructure: "string",
        PhoneNumber: number,
    }
    SNS.publish(msgParam, (err, data) => {
        if (err) {
            callback(err, data);
        } else {
            callback(null, data);
        }
    })

}