const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String,
        default: null
    },
    userType: {
        type: String
    },
    gender: {
        type: String
    },
    religion: {
        type: String,
        default: null
    },
    exp_level: {
        type: String,
        default: null
    },
    address1: {
        type: String,
        default: null
    },
    address2: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    country_state: {
        type: String,
        default: null
    },
    country_code: {
        type: String,
        default: null
    },
    availability: {
        type: String,
        default: null
    },
    price: {
        type: Schema.Types.Decimal128,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    social: {
        facebook: {
            type: String,
            default: null
        },
        twitter: {
            type: String,
            default: null
        },
        linkedin: {
            type: String,
            default: null
        },
        dribble: {
            type: String,
            default: null
        },
    },
    schedule: {
        friday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        },
        saturday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        },
        sunday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        },
        monday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        },
        tuesday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        },
        wednesday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        },
        thursday: {
            nineAm: {type: String, default: null},
            tenAm: {type: String, default: null},
            elevenAm: {type: String, default: null},
            twelvePm: {type: String, default: null},
            onePm: {type: String, default: null},
            twoPm: {type: String, default: null},
            threePm: {type: String, default: null},
            fourPm: {type: String, default: null},
            fivePm: {type: String, default: null},
            sixPm: {type: String, default: null},
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;