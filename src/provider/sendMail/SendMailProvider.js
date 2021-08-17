const nodemailer = require('nodemailer');

exports.mailProvider = async (email, subject, message) => {

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS.
        }
    });

    const info = await transporter.sendMail({
        to: `${email}`,
        from: "Teste <noreplay@greenwallet.com.br>",
        subject: `${subject}`,
        text: `${message}`,
        html: `${message}`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}