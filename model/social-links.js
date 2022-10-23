const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialLinks = new Schema({
    _id: Number,
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
    instagram: {
        type: String,
        default: null
    },
    youtube: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
}, { _id: false });

const SocialLink = mongoose.model('SocialLink', socialLinks);
module.exports = SocialLink;
