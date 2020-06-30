import nodemailer from 'nodemailer';
const logger = require('simple-node-logger').createSimpleLogger();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'taofeekhammed@gmail.com',
        pass: 'olajide4me'
    }
});

const sendEmail = async (email, message) => {
    const mailOptions = {
        from: ' "Food Farm" taofeekhammed@gmail.com',
        to: email,
        subject: 'Food Farm Notification',
        text: message
    };
    try{
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(error.message);
            } else {
                logger.info('Email sent: ' + info.response);
            }
        });
    }catch(error){
        logger.error(error.message)
    }
}

export default sendEmail;