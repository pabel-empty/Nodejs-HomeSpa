const validator = require('validator');
const isEmpty = require('./is-empty');

const pricePlanValidation = data => {
    let errors = {}

    if(validator.isEmpty(data.title)){
        errors.title = "Title is Required"
    }else if (!validator.isLength(data.title, {min: 3, max: 20})){
        errors.title = "Title must be between 3 and 20 characters"
    }

    if(validator.isEmpty(data.planType)){
        errors.planType = "Plan type is Required"
    }

    if (data.plans.length < 3){
        errors.plans = "Minimum 3 plans must be added"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = pricePlanValidation;