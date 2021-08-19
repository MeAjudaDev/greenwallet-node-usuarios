const nodemailer = require('nodemailer');

exports.mailProvider = async (email, subject, message) => {

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass
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