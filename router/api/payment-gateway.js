const express = require('express');
const nodemailer = require('nodemailer');
const uniqId = require('uniqid');
const router = express.Router();
const Appointment = require('../../model/appointment');
const StripeCustomerCard = require('../../model/stripe-customer-card');
const StripeChargeDetails = require('../../model/stripe-charge-details');

// Stripe with Stripe Keys
const Public_Key = 'pk_test_51LPXkIIoq31seGQk9d7aOySUgwf4j3fQLiBqyH3xjAaaksJ0NWDkNH2Hz1JCTvZ7cVexAqr0hG6qVCyHAShwZP2300DWvLAkSp';
const Secret_Key = 'sk_test_51LPXkIIoq31seGQkSVQnmWS0QZPwdI5kQcvvGAaiiMXNNI7KnyrWq4tkBcWGyGUoXZxhLmSaezuRgWNPLmTExCSP003lkTwRwy';
const stripe = require('stripe')(Secret_Key);


// Email send with the help of nodemailer
const emailSendingToClientEmail = (clientEmail) => {
    // Create nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mdpabelahmed926@gmail.com',
            pass: 'npzpjyclqnxqmfvm',
        }
    })

    // Email Template
    let emailTemplate = `<table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable">
                        <tbody>
                        <tr>
                            <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                    <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                <tbody>
                                                <tr>
                                                    <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom: 25px; padding-left: 20px; padding-right: 20px; padding-top: 50px"
                                                        align="center" valign="top" class="mainTitle">
                                                        <h2 class="text"
                                                            style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">
                                                            Confirmation Accepted</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                            <tbody>
                                                            <tr>
                                                                <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                    <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Your request has been accepted. Beautician on the way</p>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                <tbody>
                                                <tr>
                                                    <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>`;

    //the code for affirmation
    const mailOptions = {
        from: 'mdpabelahmed926@gmail.com',
        to: clientEmail,
        subject: 'Confirmation Message',
        html: emailTemplate
    };

    // Send mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}


// Email send with the help of nodemailer
const emailSending = (toEmail, generatedUniqKey, name, email, address, gender, beauticianName) => {
    // Create nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mdpabelahmed926@gmail.com',
            pass: 'npzpjyclqnxqmfvm',
        }
    })

    // Email Template
    let emailTemplate = `<table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable">
                        <tbody>
                        <tr>
                            <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                    <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                <tbody>
                                                <tr>
                                                    <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom: 25px; padding-left: 20px; padding-right: 20px; padding-top: 50px" align="center" valign="top" class="mainTitle">
                                                        <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi ${beauticianName}</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom: 20px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                        <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Payment Verify</h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                            <tbody>
                                                            <tr>
                                                                <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                    <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">The buyer has sent you a payment accept permission. Accept and engage with the buyer as soon as possible.</p>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                            class="customer_info_table" style="border: 1px solid #e5e5e5;
                                                            padding: 15px;
                                                            border-radius: 10px;
                                                            margin-bottom: 20px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding-bottom: 20px; width: 30%;"
                                                                        valign="top" class="description">
                                                                        Customer Name
                                                                    </td>
                                                                    <td style="padding-bottom: 20px; width: 70%;"
                                                                        valign="top" class="description">
                                                                        ${name}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding-bottom: 20px; width: 30%;"
                                                                        valign="top" class="description">
                                                                        Customer Address
                                                                    </td>
                                                                    <td style="padding-bottom: 20px; width: 70%;"
                                                                        valign="top" class="description">
                                                                        ${address}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding-bottom: 20px; width: 30%;"
                                                                        valign="top" class="description">
                                                                        Customer Gender
                                                                    </td>
                                                                    <td style="padding-bottom: 20px; width: 70%;"
                                                                        valign="top" class="description">
                                                                        ${gender}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="width: 30%;" valign="top"
                                                                        class="description">
                                                                        Customer Email
                                                                    </td>
                                                                    <td style="width: 70%;" valign="top"
                                                                        class="description">
                                                                        ${email}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                            class="tableButton" style="">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding-top:20px;padding-bottom:20px"
                                                                        align="center" valign="top">
                                                                        <table border="0" cellpadding="0"
                                                                            cellspacing="0" align="center">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;"
                                                                                        align="center"
                                                                                        class="ctaButton"> <a
                                                                                            href="http://localhost:5000/api/v1/payment-gateway/card-charges/${generatedUniqKey}"
                                                                                            style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block"
                                                                                            target="_blank"
                                                                                            class="text">Confirm
                                                                                            Payment</a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                <tbody>
                                                <tr>
                                                    <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>`;

    //the code for affirmation
    const mailOptions = {
        from: 'mdpabelahmed926@gmail.com',
        to: toEmail,
        subject: 'Accept Payment Method',
        html: emailTemplate
    };

    // Send mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}

// Create a appointment
router.post('/create-appointment', (req, res) => {
    // Destructuring
    const { userName, email, phone, address, password, gender } = req.body;
    // Create new schema
    const createAppointment = Appointment.create({
        userName,
        email,
        phone,
        address,
        password,
        gender
    });
    createAppointment.then((response) => {
        res.status(201).json(response)
        console.log(response);
    }).catch(error => console.log(error));
});


// Stripe Customer Created or Not Created
router.post('/is-customer-created', (req, res) => {
    const email = req.body.email;
    stripe.customers.search({
        query: `email:\'${email}\'`
    }).then(customer => {
        if(customer.data.length > 0){
            return res.status(200).json(true);
        }
        res.status(200).json(false);
    }).catch(error => {
        res.json(error);
    })
});


// Create Stripe Customer
router.post('/create-customer', (req, res) => {

    const {name, email, address, gender, cardName, cardNumber, cardExpYear, cardExpMonth, cardCvc, beauticianEmail, beauticianName } = req.body;

    // Create stripe customer with the help of stripe library
    stripe.customers.create({
        name,
        email,
    }).then(customer => {
        // Create Card Token
        stripe.tokens.create({
            card: {
                name: cardName,
                number: cardNumber,
                exp_year: cardExpYear,
                exp_month: cardExpMonth,
                cvc: cardCvc
            }
        }).then(cardToken => {
            // Create Card Resource
            stripe.customers.createSource(customer.id, {
                source: `${cardToken.id}`
            }).then(card => {

                // Generate Unique with the help of uniqid library
                const generatedUniqKey = uniqId('payment-');
                // Email Function
                emailSending(beauticianEmail, generatedUniqKey, name, email, address, gender, beauticianName);
                // Store stripe data to database from stripe
                StripeCustomerCard.create({
                    customer_id: customer.id,
                    card_id: card.id,
                    uniqId: generatedUniqKey,
                    payment_accepted: false,
                    object: customer.object,
                    address: customer.address,
                    balance: customer.balance,
                    created: customer.created,
                    currency: customer.currency,
                    default_currency: customer.default_currency,
                    default_source: customer.default_source,
                    delinquent: customer.delinquent,
                    description: customer.description,
                    discount: customer.discount,
                    email: customer.email,
                    invoice_prefix: customer.invoice_prefix,
                    invoice_settings: {
                        custom_fields: customer.invoice_settings.custom_fields,
                        default_payment_method: customer.invoice_settings.default_payment_method,
                        footer: customer.invoice_settings.footer,
                        rendering_options: customer.invoice_settings.rendering_options,
                    },
                    livemode: customer.livemode,
                    metadata: customer.metadata,
                    name: customer.name,
                    next_invoice_sequence: customer.next_invoice_sequence,
                    phone: customer.phone,
                    preferred_locales: customer.preferred_locales,
                    shipping: customer.shipping,
                    tax_exempt: customer.tax_exempt,
                    test_clock: customer.test_clock,
                }).then(createdCustomer => {

                    res.status(201).json(createdCustomer);
                }).catch(error => {
                    res.status(400).json(error);
                });
            }).catch(error => {
                res.status(400).json(error);
            });
        }).catch(error => {
            res.status(400).json(error);
        });
    }).catch(error => {
       res.status(400).json(error);
    });
});


// User Card Charges after Email Confirmation Completed
router.get('/card-charges/:uniqId', (req, res) => {
    // Find from database
    StripeCustomerCard.findOne({uniqId: req.params.uniqId, payment_accepted: false}).then(stripeRegisterCustomer => {
        if(stripeRegisterCustomer){
            // Create Charges
            const createCharge = stripe.charges.create({
                receipt_email: 'mdpabelahmed926@gmail.com',
                amount: 20 * 100,
                currency: 'usd',
                card: stripeRegisterCustomer.card_id,
                customer: stripeRegisterCustomer.customer_id
            });
            // Async method
            createCharge.then(createdCharge => {
                stripeRegisterCustomer.payment_accepted = true;
                stripeRegisterCustomer.save().then(() => {
                    emailSendingToClientEmail(stripeRegisterCustomer.email);
                    StripeChargeDetails.create(createdCharge).then(createdChargeDetails => {
                        res.status(201).json(true);
                    }).catch(error => {
                        res.status(400).json(error);
                    });
                }).catch(error => {
                    res.status(400).json(error);
                });
            }).catch(error => {
                res.status(400).json(error);
            });
        }else{
            res.status(400).json({
                message: 'Payment already accepted or unknown url'
            })
        }
    })
});


// Add New Beautician
router.post('/add-new-beautician', (req, res) => {
    const beauticianEmail = req.body.beauticianEmail;
    const userEmail = req.body.userEmail;
    // Generate Unique with the help of uniqid library
    const generatedUniqKey = uniqId('payment-');
    // Find stripe email from database
    StripeCustomerCard.findOne({email: userEmail}).then(stripeCustomer => {
        if(stripeCustomer){
            stripeCustomer.uniqId = generatedUniqKey;
            stripeCustomer.payment_accepted = false;
            stripeCustomer.save(() => {
                // Email Function
                emailSending(beauticianEmail, generatedUniqKey);
                res.status(201).json({
                    message: 'Confirmation email sent to beautician'
                })
            }).catch(error => {
                res.status(400).json(error);
            });
        }else{
            res.status(404).json({message: `${userEmail} email user not found`})
        }
    }).catch(error => {
        res.status(400).json(error);
    });
});


module.exports = router;