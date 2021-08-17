const { mailProvider } = require('../provider/sendMail/SendMailProvider');
const tokenOptions = require('../utils/TokenOptions');

exports.activationAccountMail = async (name, email, activation_code) => {
  try {
    const token = tokenOptions.generateToken({ email }, '5h');
    const link = `${process.env.USER_ACTIVATION_URL}${token}`;

    await mailProvider(email, "Ativação de Conta", `<h1>Olá ${name}!</h1> <h3>Seu código de ativação é: <br><br> ${activation_code}
      </h3> <p>Link para realizar a ativação:</p> <br> <a><strong>${link}</strong></a>`);
  } catch (err) {
    console.error(err);
  }
}
