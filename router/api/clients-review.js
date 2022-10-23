const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/user-authenticated');
const User = require('../../model/user');
const ClientReview = require('../../model/client-review');
const isEmpty = require('../../utils/is-empty');
const paginationQuery = require('../../utils/pagination-query');


// Create client review
router.post('/create', isAuthenticated(), (req, res) => {
   const { description, rating } = req.body;
    let errors = {}
    if(isEmpty(description)){
       errors.description = 'Please description field must not be empty';
    }
    if(isEmpty(rating)){
        errors.rating = 'Please provide a rate';
    }

    if(!isEmpty(errors)){
        return res.status(400).json(errors);
    }

   User.findOne({_id: req.user.id})
       .then(user => {
           if(!user){
               return res.status(404).json({
                   message: 'User not found!!!'
               })
           }
           const createdReview = ClientReview.create({
               userId: req.user.id,
               name: user.firstName+' '+user.lastName,
               rating: rating,
               description: description,
               image: user.image
           });
           createdReview.then(review => {
               res.status(201).json(review);
           }).catch(error => {
               res.status(500).json(error);
           })
       })
       .catch(error => {
           res.status(500).json(error);
       })
});


// Find All Client Reviews
router.get('/find/all', (req, res) => {
    const { skip, limit } = paginationQuery(req.query);
    ClientReview.find()
        .limit(limit)
        .skip(skip)
        .then(reviews => {
            res.status(206).json(reviews);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// Find All Client Reviews By State
router.get('/find/by/state/:state', (req, res) => {
    const state = req.params.state;
    if(state !== 'ACTIVE' && state !== 'INACTIVE' && state !== 'DELETED'){
        return res.status(400).json({
            message: 'Only allowed Active or Inactive keyword'
        });
    }

    const { skip, limit } = paginationQuery(req.query);
    ClientReview.find({state: req.params.state})
        .limit(limit)
        .skip(skip)
        .then(reviews => {
            res.status(206).json(reviews);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// Find review by Review ID
router.get('/find/by/id/:id', (req, res) => {
   ClientReview.findOne({_id: req.params.id}).then(review => {
       res.status(200).json(review);
   }).catch(error => {
       res.status(500).json(error);
   });
});


// Find review by User ID
router.get('/find/by/user/id/:id', (req, res) => {
    const { skip, limit } = paginationQuery(req.query);
    ClientReview.find({userId: req.params.id})
        .limit(limit)
        .skip(skip)
        .then(review => {
            if(review.length === 0){
                return res.status(204).json(review);
            }
            res.status(206).json(review);
        }).catch(error => {
            res.status(500).json(error);
        });
});


// Search Reviews
router.get('/search-keyword/:keys', (req, res) => {
    const { skip, limit } = paginationQuery(req.query);

    const keys = req.params.keys.toLowerCase();
    ClientReview.find({
            $or: [
                {name: {$regex: keys, $options: 'i'}},
                {description: {$regex: keys, $options: 'i'}}
            ]
        })
        .limit(limit)
        .skip(skip)
        .then(reviews => {
            if(reviews.length === 0){
                return res.status(204).json(reviews);
            }
            res.status(206).json(reviews);
        }).catch(error => {
            res.status(500).json(error);
        });
});


// Delete Review by Review ID
router.delete('/delete/by/id/:id', isAuthenticated(), (req, res) => {
    User.findOne({_id: req.user.id}).where('userType').equals('SUPER_ADMIN').then(user => {
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }
        ClientReview.findByIdAndDelete(req.params.id, (err, doc) => {
           if(err){
               return res.status(500).json(err);
           }
           res.status(202).json(true);
        });
    }).catch(error => {
        res.status(500).json(error);
    });
});


// Update Review State by Review ID
router.post('/update/state/by/id/:id', isAuthenticated(), (req, res) => {
    User.findOne({_id: req.user.id}).where('userType').equals('SUPER_ADMIN').then(user => {
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }
        ClientReview.findOne({_id: req.params.id}).then(review => {
            const state = req.body.state.toUpperCase();
            if(state !== 'ACTIVE' && state !== 'INACTIVE' && state !== 'DELETED'){
                return res.status(400).json({
                    message: 'Only allowed ACTIVE or INACTIVE DELETED keyword for update state'
                });
            }
            review.state = state;
            review.save().then(updatedReview => {
                res.status(202).json(updatedReview);
            }).catch(error => {
                res.status(500).json(error);
            });
        }).catch(error => {
            res.status(500).json(error);
        });
    })
});

// Get total Count
router.get('/total-count', (req, res) => {
    ClientReview.find()
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
})


module.exports = router;