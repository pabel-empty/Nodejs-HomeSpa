const validator = require('validator');
const isEmpty = require('./is-empty');

const signUpValidation = data => {
    // Errors Object
    let errors = {}

    if(validator.isEmpty(data.firstName)){
        errors.firstName = 'Please provide your first name';
    }else if(!validator.isLength(data.firstName, {min:3, max: 32})) {
        errors.firstName = 'First name must be between 3 and 32 characters';
    }

    if(validator.isEmpty(data.lastName)){
        errors.lastName = 'Please provide your last name';
    }else if(!validator.isLength(data.lastName, {min:3, max: 32})) {
        errors.lastName = 'Last name must be between 3 and 32 characters';
    }

    if(validator.isEmpty(data.username)){
        errors.username = 'Please provide a username'
    }else if(!validator.isLength(data.username, {min:3, max: 32})){
        errors.username = 'Username must be between 3 and 32 characters';
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required';
    }else if(!validator.isEmail(data.email)){
        errors.email = 'Email is not valid !!!'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password must be required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = signUpValidation;