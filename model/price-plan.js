const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pricePlanSchema = new Schema({
    title: {
        type: String,
        default: null
    },
    planType: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    plans: [{
        title: String,
        description: String,
        price: Number
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

module.exports = PricePlan = mongoose.model('PricePlan', pricePlanSchema);