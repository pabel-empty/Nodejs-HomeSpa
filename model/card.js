const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    cardName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    cardExpYear: {
        type: Number,
        required: true
    },
    cardExpMonth: {
        type: String,
        required: true
    },
    cardCvc: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('card', cardSchema);
module.exports = Card;