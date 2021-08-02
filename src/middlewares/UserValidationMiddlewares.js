exports.VerifyCreateUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    let errors = []

    if(name === "" || name.length > 100)  {
      error = {
        msg: "Invalid value",
        param: "name"
      }
      errors.push(error);
    }

    if(email === ""|| name.length > 100)  {
      error = {
        msg: "Invalid value",
        param: "email"
      }
      errors.push(error);
    }

    if(password === ""|| name.length > 10)  {  //Confirmar tamanho da senha: André definiu como tamanho 100 caracteres.
      error = {
        msg: "Invalid value",
        param: "password"
      }
      errors.push(error);
    }

    if(errors.length == 0) {
      next();
    } else {
      return res.status(400).json(errors);
    }

    
}