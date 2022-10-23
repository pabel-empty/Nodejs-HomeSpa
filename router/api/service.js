const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uuid } = require('uuidv4');
const path = require('path');
const fs = require('fs');
const Service = require('../../model/service');
const paginationQuery = require('../../utils/pagination-query');
const authenticated = require('../../config/user-authenticated');
const User = require("../../model/user");

// Set Headers X-total-count
const setHeaders = (res, count) => {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    res.set('X-Total-Count', count.toString())
}

// Create image upload storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploaded_image/');
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, uuid() +'-'+ fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if(extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            return callback(new Error('Only png, jpg, jpeg images are allowed !!'));
        }
        callback(null, true);
    },
    limits:{
        fileSize: 1024 * 1024
    },

}).single('image');



// create service
router.post('/create', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

        upload(req, res, (err) => {
            if(err instanceof multer.MulterError){
                return res.status(500).json(err);
            }else if(err){
                return res.status(500).json(err);
            }
            if(req.file === undefined){
                return res.status(400).json({
                    message: 'Error: No File Selected!'
                });
            }

            const url = req.protocol + '://' + req.get('host');
            const image = url + '/uploaded_image/' + req.file.filename;
            const title = req.body.title;
            const category = req.body.category;
            const description = req.body.description;
            const state = req.body.state.toUpperCase();

            Service.create({
                    image,
                    title,
                    category,
                    description,
                    state
                })
                .then(createdService => {
                    res.status(201).json(createdService);
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        });
    });
});


// Find all created service list
router.get('/find/all', (req, res) => {
    const { skip, limit } = paginationQuery(req.query);
    Service.count().then(count => {
        Service.find()
            .limit(limit)
            .skip(skip)
            .then(services => {
                setHeaders(res, count);
                if(services.length === 0){
                    return res.status(204).json(services);
                }
                res.status(206).json(services);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }).catch(error => {
        res.status(500).json(error);
    })
});


// Find all services by category name
router.get('/find/all/by/category/:category', (req, res) => {
   const { skip, limit } = paginationQuery(req.query);
   Service.find({category: req.params.category.toLowerCase()}).count().then((count) => {
       Service.find()
           .where('category')
           .equals(req.params.category)
           .limit(limit)
           .skip(skip)
           .then(services => {
               setHeaders(res, count);
               if(services.length === 0){
                   return res.status(204).json(services);
               }
               res.status(206).json(services);
           })
           .catch(error => {
               res.status(500).json(error);
           });
   }).catch(error => {
       res.status(500).json(error);
   });

});


// Find all services by state
router.get('/find/all/by/state/:state', (req, res) => {
   const { skip, limit } = paginationQuery(req.query);
   Service.find({state: req.params.state.toUpperCase()}).count().then((count) => {
       Service.find()
           .where('state')
           .equals(req.params.state.toLowerCase())
           .limit(limit)
           .skip(skip)
           .then(services => {
               setHeaders(res, count);
               if(services.length === 0){
                   return res.status(204).json(services);
               }
               res.status(206).json(services);
           })
           .catch(error => {
               res.status(500).json(error);
           });
   }).catch(error => {
        res.status(500).json(error);
   });
});


// Search Service with keyword
router.post('/search/keyword', (req, res) => {
    const keyword = req.body.keyword;
    const { skip, limit } = paginationQuery(req.query);
    Service.find({
        $or: [
            {title: {$regex: keyword, $options: 'i'}}
        ]
    }).count().then((count) => {
        Service.find({
            $or: [
                {title: {$regex: keyword, $options: 'i'}}
            ]
        }).limit(limit).skip(skip).then(services => {
            setHeaders(res, count);
            if(services.length === 0){
                return res.status(204).json(services);
            }
            res.status(206).json(services);
        }).catch(error => {
            res.status(500).json(error);
        });
    }).catch(error => {
        res.status(500).json(error);
    });
})


// Find service by ID
router.get('/find/by/id/:id', (req, res) => {
   Service.findById(req.params.id)
       .then(service => {
           if(!service){
               return res.status(404).json({
                   message: 'Service Not Found'
               });
           }
           res.status(200).json(service);
       })
       .catch(error => {
           res.status(500).json(error);
       });
});


// Update service state by ID
router.post('/update-state/by/id/:id', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

        const state = req.body.state.toUpperCase();
        Service.findOne({_id:req.params.id})
        .then(service => {
            if(state !== 'ACTIVE' && state !== 'INACTIVE' && state !== 'DELETED'){
                return res.status(400).json({
                    message: 'Only allowed ACTIVE or INACTIVE DELETED keyword for update state'
                });
            }

            service.state = state;
            service.updatedAt = Date.now();
            service.save()
                .then((updatedService) => {
                    res.status(202).json(updatedService);
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error);
                });
        })
        .catch(error => {
           res.status(400).json(error);
        });
    });
});


// update service by ID
router.post('/update/by/id/:id', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

        Service.findOne({_id: req.params.id})
            .then(service => {
                upload(req, res, (err) => {
                    if(err instanceof multer.MulterError){
                        return res.status(500).json(err);
                    }else if(err){
                        return res.status(500).json(err);
                    }
                    if(req.file === undefined){
                        return res.status(400).json({
                            message: 'Error: No File Selected!'
                        });
                    }

                    // If filename is not undefined
                    let imageUrl = null;
                    const protocolUrl = req.protocol + '://' + req.get('host');
                    imageUrl = protocolUrl + '/uploaded_image/' + req.file.filename;

                    // When new image file is loaded for upload to server
                    if(service.image !== null){
                        const imageOriginalName = service.image.split('/').pop();
                        const DIR = './uploaded_image/';
                        fs.unlinkSync(DIR + imageOriginalName);
                    }

                    service.image = imageUrl;
                    service.title = req.body.title;
                    service.category = req.body.category;
                    service.description = req.body.description;
                    service.state = req.body.state;
                    service.updatedAt = Date.now();
                    // Save the updated credentials
                    service.save()
                        .then(updatedService => {
                            res.status(202).json(updatedService);
                        })
                        .catch(error => {
                            res.status(500).json(error);
                        });
                });
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });
});


// Delete service by ID
router.delete('/delete/by/id/:id', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

       Service.find().where('_id').equals(req.params.id)
           .then((service) => {
               if(service.length > 0){
                   service[0].remove()
                       .then(() => {
                           if(service[0].image !== null){
                               const imageOriginalName = service[0].image.split('/').pop()
                               const DIR = './uploaded_image/';
                               fs.unlinkSync(DIR + imageOriginalName)
                           }
                           res.status(202).json({
                               message: 'Service Deleted Successfully !!'
                           })
                        }).catch(error => {
                            res.status(400).json(error);
                        });
               }else{
                   res.status(404).json({
                       message: 'Your Provided Service Not Found'
                   })
               }
           })
           .catch(error => {
               res.status(400).json(error);
           });
    });
});


// Get total service count
router.get('/count', (req, res) => {
    Service.find()
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
});


module.exports = router;