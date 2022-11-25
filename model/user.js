const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const timeScheduleSchema = new Schema({
//     from: String,
//     to: String,
//     available: {
//         type: Boolean,
//         default: false
//     },
// });


// Days Schema
// const daysSchema = new Schema({
//     one: {
//         type: Number,
//         default: 1,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     two: {
//         type: Number,
//         default: 2,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     three: {
//         type: Number,
//         default: 3,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     four: {
//         type: Number,
//         default: 4,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     five: {
//         type: Number,
//         default: 5,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     six: {
//         type: Number,
//         default: 6,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     seven: {
//         type: Number,
//         default: 7,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     eight: {
//         type: Number,
//         default: 8,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     nine: {
//         type: Number,
//         default: 9,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     ten: {
//         type: Number,
//         default: 10,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     eleven: {
//         type: Number,
//         default: 11,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twelve: {
//         type: Number,
//         default: 12,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     thirteen: {
//         type: Number,
//         default: 13,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     fourteen: {
//         type: Number,
//         default: 14,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     fifteen: {
//         type: Number,
//         default: 15,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     sixteen: {
//         type: Number,
//         default: 16,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     seventeen: {
//         type: Number,
//         default: 17,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     eighteen: {
//         type: Number,
//         default: 18,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     nineteen: {
//         type: Number,
//         default: 19,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twenty: {
//         type: Number,
//         default: 20,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyOne: {
//         type: Number,
//         default: 21,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyTwo: {
//         type: Number,
//         default: 22,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyThree: {
//         type: Number,
//         default: 23,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyFour: {
//         type: Number,
//         default: 24,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyFive: {
//         type: Number,
//         default: 25,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentySix: {
//         type: Number,
//         default: 26,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentySeven: {
//         type: Number,
//         default: 27,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyEight: {
//         type: Number,
//         default: 28,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     twentyNine: {
//         type: Number,
//         default: 29,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     thirty: {
//         type: Number,
//         default: 30,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
//     thirtyOne: {
//         type: Number,
//         default: 31,
//         availability: {
//             type: Boolean,
//             default: false
//         },
//         time: [
//             timeScheduleSchema
//         ]
//     },
// })

// User Schema
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
        year: {
            type: String,
            default: '2022',
        },
        months: {
            jan: {
                monthName: {
                    type: String,
                    default: 'Jan',
                },
                days: {
                    one: {
                        value: {
                            type: Number,
                            default: 1,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    two: {
                        value: {
                            type: Number,
                            default: 2,
                        },
                        availability: {
                            type: Boolean,
                            default: true
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    three: {
                        value: {
                            type: Number,
                            default: 3,
                        },
                        availability: {
                            type: Boolean,
                            default: true
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    four: {
                        value: {
                            type: Number,
                            default: 4,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    five: {
                        value: {
                            type: Number,
                            default: 5,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    six: {
                        value: {
                            type: Number,
                            default: 6,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    seven: {
                        value: {
                            type: Number,
                            default: 7,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    eight: {
                        value: {
                            type: Number,
                            default: 8,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    nine: {
                        value: {
                            type: Number,
                            default: 9,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    ten: {
                        value: {
                            type: Number,
                            default: 10,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    eleven: {
                        value: {
                            type: Number,
                            default: 11,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twelve: {
                        value: {
                            type: Number,
                            default: 12,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    thirteen: {
                        value: {
                            type: Number,
                            default: 13,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    fourteen: {
                        value: {
                            type: Number,
                            default: 14,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    fifteen: {
                        value: {
                            type: Number,
                            default: 15,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    sixteen: {
                        value: {
                            type: Number,
                            default: 16,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    seventeen: {
                        value: {
                            type: Number,
                            default: 17,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    eighteen: {
                        value: {
                            type: Number,
                            default: 18,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    nineteen: {
                        value: {
                            type: Number,
                            default: 19,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twenty: {
                        value: {
                            type: Number,
                            default: 20,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyOne: {
                        value: {
                            type: Number,
                            default: 21,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyTwo: {
                        value: {
                            type: Number,
                            default: 22,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyThree: {
                        value: {
                            type: Number,
                            default: 23,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyFour: {
                        value: {
                            type: Number,
                            default: 24,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyFive: {
                        value: {
                            type: Number,
                            default: 25,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentySix: {
                        value: {
                            type: Number,
                            default: 26,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentySeven: {
                        value: {
                            type: Number,
                            default: 27,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyEight: {
                        value: {
                            type: Number,
                            default: 28,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    twentyNine: {
                        value: {
                            type: Number,
                            default: 29,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    thirty: {
                        value: {
                            type: Number,
                            default: 30,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                    thirtyOne: {
                        value: {
                            type: Number,
                            default: 31,
                        },
                        availability: {
                            type: Boolean,
                            default: false
                        },
                        time: {
                            type: [],
                            default: [
                                {
                                    from: {
                                        type: String,
                                        default: '8:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '9:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '10:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: false
                                    },
                                },
                                {
                                    from: {
                                        type: String,
                                        default: '11:00 AM'
                                    },
                                    to: {
                                        type: String,
                                        default: '12:00 PM'
                                    },
                                    available: {
                                        type: Boolean,
                                        default: true
                                    },
                                },
                            ]
                        }
                    },
                }
            },
            feb: {
                monthName: {
                    type: String,
                    default: 'Fab',
                },
            },
            mar: {
                monthName: {
                    type: String,
                    default: 'Mar',
                },
            },
            apr: {
                monthName: {
                    type: String,
                    default: 'Apr',
                },
            },
            may: {
                monthName: {
                    type: String,
                    default: 'May',
                },
            },
            jun: {
                monthName: {
                    type: String,
                    default: 'Jun',
                },
            },
            jul: {
                monthName: {
                    type: String,
                    default: 'Jul',
                },
            },
            aug: {
                monthName: {
                    type: String,
                    default: 'Aug',
                },
            },
            sep: {
                monthName: {
                    type: String,
                    default: 'Sep',
                },
            },
            oct: {
                monthName: {
                    type: String,
                    default: 'Oct',
                },
            },
            nov: {
                monthName: {
                    type: String,
                    default: 'Nov',
                },
            },
            dec: {
                monthName: {
                    type: String,
                    default: 'Dec',
                },
            },
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

// Get Full Year
// const getFullYear = new Date().getFullYear();

