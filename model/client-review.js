const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: 'ACTIVE'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});
module.exports = ClientReview = mongoose.model('ClientReview', clientReviewSchema);