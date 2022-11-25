const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateTimeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    available: {
        type: Boolean,
        default: false
    },
    schedule: [
        {
            year: {
                type: Number,
                required: true
            },
            months: [
                {
                    name: {
                        type: Number,
                        default: 1
                    },
                    date: [
                        {
                            dateNumber: {
                                type: Number
                            },
                            availableSlot: [
                                {
                                    _id: {
                                        type: String
                                    },
                                    startHour: {
                                        type: Number,
                                        required: true
                                    },
                                    endHour: {
                                        type: Number,
                                        required: true
                                    },
                                    available: {
                                        type: String
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});
module.exports = DateTimeSchedule = mongoose.model('DateTimeSchedule', dateTimeSchema);