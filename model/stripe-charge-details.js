const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stripeChargeDetails = new Schema({
    id: {
        type: String
    },
    object: {
        type: String
    },
    amount: {
        type: Number
    },
    amount_captured: {
        type: Number
    },
    amount_refunded: {
        type: Number
    },
    application: {
        type: Schema.Types.Mixed
    },
    application_fee: {
        type: Schema.Types.Mixed
    },
    application_fee_amount: {
        type: Schema.Types.Mixed
    },
    balance_transaction: {
        type: String
    },
    billing_details: {
        address: {
            city: {
                type: Schema.Types.Mixed
            },
            country: {
                type: Schema.Types.Mixed
            },
            line1: {
                type: Schema.Types.Mixed
            },
            line2: {
                type: Schema.Types.Mixed
            },
            postal_code: {
                type: Schema.Types.Mixed
            },
            state: {
                type: Schema.Types.Mixed
            }
        },
        email: {
            type: Schema.Types.Mixed
        },
        name: {
            type: String
        },
        phone: {
            type: Schema.Types.Mixed
        }
    },
    calculated_statement_descriptor: {
        type: String
    },
    captured: {
        type: Boolean
    },
    created: {
        type: Number
    },
    currency: {
        type: String
    },
    customer: {
        type: String
    },
    description: {
        type: String
    },
    disputed: {
        type: Boolean
    },
    failure_balance_transaction: {
        type: Schema.Types.Mixed
    },
    failure_code: {
        type: Schema.Types.Mixed
    },
    failure_message: {
        type: Schema.Types.Mixed
    },
    fraud_details: Schema.Types.Mixed,
    invoice: {
        type: Schema.Types.Mixed
    },
    livemode: {
        type: Boolean
    },
    metadata: Schema.Types.Mixed,
    on_behalf_of: {
        type: Schema.Types.Mixed
    },
    outcome: {
        network_status: {
            type: String
        },
        reason: {
            type: Schema.Types.Mixed
        },
        risk_level: {
            type: String
        },
        risk_score: {
            type: Number
        },
        seller_message: {
            type: String
        },
        type: {
            type: String
        }
    },
    paid: {
        type: Boolean
    },
    payment_intent: {
        type: Schema.Types.Mixed
    },
    payment_method: {
        type: String
    },
    payment_method_details: {
        card: {
            brand: {
                type: String
            },
            checks: {
                address_line1_check: {
                    type: Schema.Types.Mixed
                },
                address_postal_code_check: {
                    type: Schema.Types.Mixed
                },
                cvc_check: {
                    type: Schema.Types.Mixed
                }
            },
            country: {
                type: String
            },
            exp_month: {
                type: Number
            },
            exp_year: {
                type: Number
            },
            fingerprint: {
                type: String
            },
            funding: {
                type: String
            },
            installments: {
                type: Schema.Types.Mixed
            },
            last4: {
                type: Date
            },
            mandate: {
                type: Schema.Types.Mixed
            },
            network: {
                type: String
            },
            three_d_secure: {
                type: Schema.Types.Mixed
            },
            wallet: {
                type: Schema.Types.Mixed
            }
        },
        type: {
            type: String
        }
    },
    receipt_email: {
        type: String
    },
    receipt_number: {
        type: Schema.Types.Mixed
    },
    receipt_url: {
        type: String
    },
    refunded: {
        type: Boolean
    },
    refunds: {
        object: {
            type: String
        },
        data: {
            type: Array
        },
        has_more: {
            type: Boolean
        },
        url: {
            type: String
        }
    },
    review: {
        type: Schema.Types.Mixed
    },
    shipping: {
        type: Schema.Types.Mixed
    },
    source: {
        id: {
            type: String
        },
        object: {
            type: String
        },
        address_city: {
            type: Schema.Types.Mixed
        },
        address_country: {
            type: Schema.Types.Mixed
        },
        address_line1: {
            type: Schema.Types.Mixed
        },
        address_line1_check: {
            type: Schema.Types.Mixed
        },
        address_line2: {
            type: Schema.Types.Mixed
        },
        address_state: {
            type: Schema.Types.Mixed
        },
        address_zip: {
            type: Schema.Types.Mixed
        },
        address_zip_check: {
            type: Schema.Types.Mixed
        },
        brand: {
            type: String
        },
        country: {
            type: String
        },
        customer: {
            type: String
        },
        cvc_check: {
            type: Schema.Types.Mixed
        },
        dynamic_last4: {
            type: Schema.Types.Mixed
        },
        exp_month: {
            type: Number
        },
        exp_year: {
            type: Number
        },
        fingerprint: {
            type: String
        },
        funding: {
            type: String
        },
        last4: {
            type: Date
        },
        metadata: {},
        name: {
            type: String
        },
        tokenization_method: {
            type: Schema.Types.Mixed
        }
    },
    source_transfer: {
        type: Schema.Types.Mixed
    },
    statement_descriptor: {
        type: Schema.Types.Mixed
    },
    statement_descriptor_suffix: {
        type: Schema.Types.Mixed
    },
    status: {
        type: String
    },
    transfer_data: {
        type: Schema.Types.Mixed
    },
    transfer_group: {
        type: Schema.Types.Mixed
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
const StripeChargeDetail = mongoose.model('StripeChargeDetail', stripeChargeDetails);
module.exports = StripeChargeDetail;