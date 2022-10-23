const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerStripeCardSchema = new Schema({
    customer_id: {
        type: String
    },
    card_id: {
        type: String,
    },
    uniqId: {
        type: String
    },
    payment_accepted: {
        type: Boolean
    },
    object: {
        type: String
    },
    address: {
        type: String
    },
    balance: {
        type: Number
    },
    created: {
        type: Number
    },
    currency: {
        type: String
    },
    default_currency: {
        type: String
    },
    default_source: {
        type: String
    },
    delinquent: {
        type: Boolean
    },
    description: {
        type: String
    },
    discount: {
        type: String
    },
    email: {
        type: String
    },
    invoice_prefix: {
        type: String
    },
    invoice_settings: {
        custom_fields: {
            type: String
        },
        default_payment_method: {
            type: String
        },
        footer: {
            type: String
        },
        rendering_options: {
            type: String
        }
    },
    livemode: {
        type: Boolean
    },
    metadata: {},
    name: {
        type: String
    },
    next_invoice_sequence: {
        type: Number
    },
    phone: {
        type: String
    },
    preferred_locales: {
        type: Array
    },
    shipping: {
        type: String
    },
    tax_exempt: {
        type: String
    },
    test_clock: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const StripeCustomerCard = mongoose.model('StripeCustomerCard', customerStripeCardSchema);
module.exports = StripeCustomerCard;