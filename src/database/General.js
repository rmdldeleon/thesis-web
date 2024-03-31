const { con } = require('./Connection');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rmdldeleon@gmail.com', // Your email address
      pass: '152431524466cC' // Your email password or application-specific password
    }
 });

 


const sendFeedback = (data, callback) => {
    // const userID
    // const email
    // const name
    // const type
    // const message

    const mailOptions = {
        from : {
          name: "System User",
          address: 'rmdldeleon@gmail.com'
        },
        to: "rmdldeleon@gmail.com",
        subject: `System Feedback ${type}`,
        text: message,
        // html: "<b> Hello world! </b>",
     }
}

module.exports = { sendFeedback };
