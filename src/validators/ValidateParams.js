exports.verifyParams = (params, requiredParams) => {
    const errors = [];
  
    for(let requiredParam of requiredParams ) {
      if(params[requiredParam] == "") {
        errors.push({
          msg: "Invalid input",
          param: requiredParam
        });
      }
    }
  
    return errors
  }