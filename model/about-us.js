const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutUsSchema = new Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
}, { _id: false });

const About = mongoose.model('About', aboutUsSchema);
module.exports = About;