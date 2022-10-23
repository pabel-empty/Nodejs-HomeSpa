const express = require('express');
const router = express.Router();
const authenticated = require('../../config/user-authenticated');
const User = require('../../model/user');
const PricePlan = require('../../model/price-plan');
const pricePlanValidation = require('../../utils/price-plan-validation');

// Create price plan
router.post('/create', authenticated(), (req, res)=> {
    User.findOne({_id: req.user.id}, (error, user) => {
       if(error){
           return res.status(500).json(error);
       }
       if(user.userType !== 'SUPER_ADMIN'){
           return res.status(400).json({
               message: 'You have no permission for this operation. Only for Super Admin'
           });
       }

        const { errors, isValid } = pricePlanValidation(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }

        PricePlan.exists({planType: req.body.planType.toUpperCase()}).then((exists) => {
            const requestedPlan =  req.body.planType.toUpperCase();
            if(exists){
                const plan = requestedPlan === 'BASIC' ? 'Basic' : requestedPlan === 'STANDARD' ? 'Standard' : 'Premium';
                return res.status(409).json({
                    message: `Your ${plan} plan already exists`
                });
            }

            if(requestedPlan !== 'BASIC' && requestedPlan !== 'STANDARD' && requestedPlan !== 'PREMIUM'){
                return res.status(400).json({
                    message: `Your provided pricing type is unknown. It only allowed for BASIC, STANDARD and PREMIUM`
                });
            }

            const { title, plans } = req.body;
            PricePlan.create({
                title: title,
                planType: requestedPlan,
                state: 'ACTIVE',
                plans: plans,
            }).then(plan => {
                res.status(201).json(plan)
            }).catch(err => {
                res.status(500).json(err);
            });

        }).catch(err => {
            res.status(500).json(err);
        });
    });
});


// Find all pricing table
router.get('/find/all', (req, res) => {
    PricePlan.find().then(prices => {
        res.status(200).json(prices);
    }).catch(err => {
        res.status(500).json(err);
    });
});


// Find pricing plan by ID
router.get('/find/by/id/:id', (req, res) => {
    PricePlan.findById(req.params.id, (err, pricePlan) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(pricePlan);
    });
});


// Delete Price by ID
router.delete('/delete/by/id/:id', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}, (error, user) => {
        if (error) {
            return res.status(500).json(error);
        }
        if (user.userType !== 'SUPER_ADMIN') {
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

        PricePlan.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) {
                return res.status(500).json(error);
            }
            res.status(200).json(true);
        });
    })
});


// Update pricing plan state
router.post('/update/state/by/id/:id', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}, (error, user) => {
        if (error) {
            return res.status(500).json(error);
        }
        if (user.userType !== 'SUPER_ADMIN') {
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

        const state = req.body.state.toUpperCase();
        if(state !== 'ACTIVE' && state !== 'INACTIVE'){
            return res.status(400).json({
                message: 'For state change only allowed INACTIVE or ACTIVE keyword'
            })
        }

        PricePlan.findById(req.params.id).then(plan => {
            plan.state = state;
            plan.updatedAt = Date.now();
            plan.save().then(updatedPlan => {
                res.status(202).json(updatedPlan);
            }).catch(err => {
                res.status(500).json(err);
            });
        })
    })
});



module.exports = router;