const validator = require('validator');
const isEmpty = require('../utils/is-empty');

const aboutValidation = data => {
    let errors = {}

    if(validator.isEmpty(data.email)){
        errors.email = "Email is Required"
    }else if (!validator.isEmail(data.email)){
        errors.email = "Email is Invalid !!!"
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password is Required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = aboutValidation;