const express = require('express');
const router = express.Router();
const authenticated = require('../../config/user-authenticated');
const User = require('../../model/user');
const multer = require("multer");
const {uuid} = require("uuidv4");
const path = require("path");
const About = require('../../model/about-us');
const fs = require("fs");
const SocialLinks = require('../../model/social-links');


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


// Create About
router.post('/create', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }

        About.exists({_id: 1}, (err, doc) => {
            if(err){
                return res.status(500).json(err);
            }
            if(doc){
                return res.status(409).json({
                    message: 'You has already exists about information. If you need to add new about then first remove old about Information'
                })
            }

            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err);
                } else if (err) {
                    return res.status(500).json(err);
                }
                if(req.file === undefined){
                    return res.status(400).json({
                        message: 'Error: No File Selected!'
                    });
                }

                const { title, subTitle, description } = req.body;
                // create new image url for server
                const protocolUrl = req.protocol + '://' + req.get('host');
                const imageUrl = protocolUrl + '/uploaded_image/' + req.file.filename;

                About.create({
                    _id: 1,
                    title: title,
                    subTitle: subTitle,
                    description: description,
                    image: imageUrl
                }).then((about) => {
                    res.status(201).json(about);
                }).catch(error => {
                    res.status(500).json(error);
                });
            })
        });
    })
});


// Delete about
router.delete('/delete', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }
        About.findOne({_id: 1}).then(about => {
           if(!about){
               return res.status(404).json(null)
           }
           About.findByIdAndDelete(1).then(() => {
               const imageOriginalName = about.image.split('/').pop();
               const DIR = './uploaded_image/';
               fs.unlinkSync(DIR + imageOriginalName);

               res.status(202).json(true);
           }).catch(error => {
               res.status(500).json(error);
           });
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


// Find about
router.get('/find', (req, res) => {
    About.findOne({_id: 1}).then(about => {
        if(!about){
            return res.status(404).json(null)
        }
        res.status(200).json(about);
    }).catch(error => {
        res.status(500).json(error);
    });
});


// Update The about About
router.post('/update', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }
        About.findOne({_id: 1}).then(about => {
            if(!about){
                return res.status(404).json(null)
            }
            const { title, subTitle, description } = req.body;
            about.title = title;
            about.subTitle = subTitle;
            about.description = description;
            about.updatedAt = Date.now();

            about.save().then((newAbout) => {
                res.status(202).json(newAbout);
            }).catch(error => {
                res.status(500).json(error);
            });
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


// Add Social Links
router.post('/add-social', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }

        SocialLinks.exists({_id: 1}, (err, exists) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (exists) {
                return res.status(409).json({
                    message: 'You has already exists social links. If you need to add new social links then first remove old social links'
                })
            }

            const { facebook, twitter, linkedin, instagram, youtube } = req.body;
            SocialLinks.create({
                _id: 1,
                facebook: facebook,
                twitter: twitter,
                linkedin: linkedin,
                instagram: instagram,
                youtube: youtube
                }).then(createdLinks => {
                    res.status(201).json(createdLinks);
                }).catch(error => {
                    res.status(500).json(error);
                });
        });

    });
});


// Delete Social Links
router.delete('/delete/social-links', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }
        SocialLinks.findOne({_id: 1}).then(links => {
            if(!links){
                return res.status(404).json({
                    message: 'Social links are already empty'
                })
            }
            SocialLinks.findByIdAndDelete(1).then(() => {
                res.status(202).json(true)
            }).catch(error => {
                res.status(500).json(error);
            });
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


// Find links
router.get('/find/social-links', (req, res) => {
    SocialLinks.findOne({_id: 1})
        .then(links => {
            if(!links){
                return res.status(404).json({
                    message: "Social links are not available"
                });
            }
            res.status(200).json(links);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// Update social links
router.post('/update/social-links', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }

        SocialLinks.findOne({_id: 1}).then(links => {
            if(!links){
                return res.status(404).json({
                    message: 'Social links are already empty'
                });
            }

            const { facebook, twitter, linkedin, instagram, youtube } = req.body;
            links.facebook = facebook
            links.twitter = twitter
            links.linkedin = linkedin
            links.instagram = instagram
            links.youtube = youtube
            links.save().then(updated => {
                res.status(202).json(updated);
            }).catch(error => {
                res.status(500).json(error);
            });
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


module.exports = router;