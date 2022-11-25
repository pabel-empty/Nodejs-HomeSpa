const express = require('express');
const router = express.Router();
const signUpValidation = require('../../utils/sign-up-validation');
const loginValidation = require('../../utils/login-validation');
const User = require('../../model/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const authenticated = require('../../config/user-authenticated');
const paginationQuery = require('../../utils/pagination-query');
const multer = require('multer');
const { uuid } = require('uuidv4');
const path = require('path');
const fs = require("fs");
const isEmpty = require('../../utils/is-empty');
const { serialize, parse } = require('cookie');


// create multer diskStorage;
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploaded_image/');
    },
    filename: (req, file, callback) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, uuid()+'-'+filename);
    }
});
// Create Multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if(extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            return callback(new Error('Only png, jpg, jpeg images are allowed !!'));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).single('image');


// Get Current loggedIn user information from jsonwebtoken
router.get('/logged-in-user-information', authenticated(), (req, res) => {
    res.status(200).json(req.user);
});


// Password change
router.post('/change-password', authenticated(), (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    let errors = {};
    //Check required fields
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        errors.password = 'Please fill in all fields.';
    }

    //Check passwords match
    if (newPassword !== confirmNewPassword) {
        errors.checkPassword = 'New password and Confirm password don\'t match.';
    }

    //Check password length
    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        errors.lengthPassword = 'Password should be at least six characters.';
    }

    if(!isEmpty(errors)){
        return res.status(400).json(errors);
    }

    User.findOne({_id: req.user.id})
        .then(user => {
            bcryptjs.compare(currentPassword, user.password)
                .then(isMatch => {
                    if(!isMatch){
                        return res.status(400).json({
                            message: 'Password don\'t match !!!'
                        })
                    }
                    bcryptjs.genSalt(10, (err, salt) => {
                        bcryptjs.hash(newPassword, salt, (error, hash) => {
                           if(error) throw error;
                           user.password = hash;
                           user.save()
                               .then(() => {
                                   res.status(200).json({
                                       message: 'Password changed'
                                   });
                               })
                               .catch(error => {
                                   res.status(500).json(error);
                               });
                        });
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// Delete Profile Picture
router.delete('/profile-picture', authenticated(), (req, res) => {
   User.findOne({_id: req.user.id})
       .then(user => {
           if(user.image === null){
               return res.status(400).json({
                   message: 'Already profile picture link is blank'
               })
           }

           // temporary store old image url
           const oldImageUrl = user.image;

           user.image = null;
           user.updatedAt = Date.now();
           user.save()
               .then(() => {
                   // When new image file is uploaded to server then delete old picture from store
                   if(oldImageUrl !== null){
                       const imageOriginalName = oldImageUrl.split('/').pop();
                       const DIR = './uploaded_image/';
                       fs.unlinkSync(DIR + imageOriginalName);
                   }

                   res.status(202).json({
                       message: 'Profile Picture Remove Successful'
                   });
               })
               .catch(error => {
                   res.status(500).json(error);
               });
       })
       .catch(error => {
           res.status(500).json(error);
       });
});


// Update profile picture
router.post('/profile-picture', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'This user not found'
                });
            }

            upload(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err);
                } else if (err) {
                    return res.status(500).json(err);
                }
                if (req.file === undefined) {
                    return res.status(400).json({
                        message: 'Error: No File Selected!'
                    });
                }
                //
                const prevImageLink = user.image;
                // create new image url for server
                const protocolUrl = req.protocol + '://' + req.get('host');
                const imageUrl = protocolUrl + '/uploaded_image/' + req.file.filename;

                user.image = imageUrl;
                user.save()
                    .then(updatedUser => {
                        // When new image file is uploaded to server then delete old picture from store
                        if( prevImageLink !== null){
                            const imageOriginalName =  prevImageLink.split('/').pop();
                            const DIR = './uploaded_image/';
                            fs.unlinkSync(DIR + imageOriginalName);
                        }
                        // Server Response
                        res.status(202).json(updatedUser);
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


// Create a Beautician
router.post('/sign-up', (req, res) => {
    // User input validation
    const { errors, isValid } = signUpValidation(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    // Extract user input values from request body;
    const { firstName, lastName, username, email, password, userType,  } = req.body;

    // Find existing user from database
    User.findOne({email: email})
        .then(user => {
            // When already this email is exists in database
            if(user){
                return res.status(409).json({
                    message: `Email: ${email} already exists`
                })
            }
            // Otherwise
            const newUserCredentials = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                userType: userType.toUpperCase()
            });
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUserCredentials.password, salt, (error, hash) => {
                    newUserCredentials.password = hash;
                    newUserCredentials.save()
                        .then(newUser => {
                            res.status(201).json(newUser);
                        })
                        .catch(error => {
                            res.status(500).json(error);
                        });
                });
            });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// User login
router.post('/login', (req, res) => {
    // User input validation
    const { errors, isValid } = loginValidation(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Extract user input values from request body;
    const { email, password  } = req.body;

    // Find existing user from database
    User.findOne({email: email})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: `Email: ${email} not found`
                })
            }
            bcryptjs.compare(password, user.password)
                .then(isMatch => {

                    if(!isMatch){
                        return res.status(400).json({
                            message: 'Password don\'t match !!!'
                        })
                    }
                    const payload = {
                        id: user._id,
                        name: user.firstName+' '+user.lastName,
                        username: user.username,
                        image: user.image,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        userType: user.userType,
                        gender: user.gender,
                        religion: user.religion,
                        exp_level: user.exp_level,
                        address1: user.address1,
                        address2: user.address2,
                        country: user.country,
                        country_state: user.country_state,
                        country_code: user.country_code,
                        availability: user.availability,
                        price: user.price,
                        state: user.state,
                    }
                    // 30 days time in seconds
                    const seconds = 60 * 60 * 24 * 30;
                    jwt.sign(payload, keys.secret_key, {expiresIn: `${seconds}s`}, (err, token) => {
                        if(err) throw err;
                        // Set Cookie into header
                        const serialized = serialize('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: seconds,
                            path: '/',
                        });
                        res.setHeader('Set-Cookie', serialized);
                        // Response to user
                        res.status(200).json({
                            message: 'LOGIN_SUCCESS',
                            token: `Bearer ${token}`,
                            accountType: `${user.userType}`
                        })
                    })
                })
                .catch(error => {
                    res.status(400).json(error);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// Logout
router.get('/logout', (req, res) => {
    const cookies = parse(req.headers.cookie);
    const jwt = cookies.token;
    if(!jwt){
        return res.status(401).json({
            status: 'Error',
            error: 'Unauthorized',
        });
    }

    const serialized = serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1,
        sameSite: 'strict',
        path: '/'
    });
    res.setHeader('Set-Cookie', serialized);

    res.status(200).json({
        status: 'Success',
        message: 'Logged Out',
    });
});


// Update user first name
router.post('/update/first-name', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.firstName = req.body.firstName;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});



// Update user last name
router.post('/update/last-name', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.lastName = req.body.lastName;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user username
router.post('/update/username', authenticated(), (req, res) => {
    User.findOne({username: req.body.username.toLowerCase()})
        .then(user => {
            // If username already exists then fire it
            if(user){
                return res.status(409).json({
                    message: `Username: ${req.body.username.toLowerCase()} already taken.`
                });
            }

            User.findOne({_id: req.user.id})
                .then(user => {
                    if(!user){
                        return res.status(400).json({
                            message: 'User not found'
                        });
                    }
                    user.username = req.body.username.toLowerCase();
                    user.updatedAt = Date.now();
                    user.save()
                        .then(user => {
                            res.status(202).json(user);
                        })
                        .catch(error => {
                            res.status(400).json(error);
                        });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// Update user phone number
router.post('/update/phone-number', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.phoneNumber = req.body.phoneNumber;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user Address One
router.post('/update/address1', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.address1 = req.body.address1;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user Address Two
router.post('/update/address2', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.address2 = req.body.address2;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user experience level
router.post('/update/experience', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.exp_level = req.body.exp_level.toUpperCase();
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user religion
router.post('/update/religion', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.religion = req.body.religion;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user country
router.post('/update/country', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.country = req.body.country;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user country state
router.post('/update/country_state', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.country_state = req.body.country_state;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user country code
router.post('/update/country_code', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.country_code = req.body.country_code;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user availability
router.post('/update/availability', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.availability = req.body.availability.toUpperCase();
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user price
router.post('/update/price', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.price = req.body.price;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Update user social
router.post('/update/social', authenticated(), (req, res) => {
    // Find loggedIn user from database
    User.findOne({_id: req.user.id})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            user.social.facebook = req.body.facebook;
            user.social.twitter = req.body.twitter;
            user.social.linkedin = req.body.linkedin;
            user.social.dribble = req.body.dribble;
            user.updatedAt = Date.now();
            user.save()
                .then(user => {
                    res.status(202).json(user);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});


// Find All User
router.get('/find/all', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(404).json({
                message: 'Your Account no longer available!!!'
            })
        }

        const { skip, limit } = paginationQuery(req.query);
        User.find()
            .limit(limit)
            .skip(skip)
            .then(users => {
                res.status(206).json(users);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });
})


// Find users by name keywords
router.post('/search/name-keyword', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(404).json({
                message: 'Your Account no longer available!!!'
            })
        }

        const { skip, limit } = paginationQuery(req.query);
        const keyword = req.body.keyword;
        User.find({
            $or: [
                {
                    firstName: {$regex: keyword, $options: 'i'}
                },
                {
                    lastName: {$regex: keyword, $options: 'i'}
                }
            ]
        }).limit(limit).skip(skip).then(users => {
            if(users.length === 0){
                return res.status(204).json(users);
            }
            res.status(206).json(users);
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


// Find users by email
router.post('/search/email', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }
        const { skip, limit } = paginationQuery(req.query);
        const email = req.body.email;

        User.find({
            $or: [
                {
                    email: {$regex: email, $options: 'i'}
                }
            ]
        }).limit(limit).skip(skip).then(users => {
            if(users.length === 0){
                return res.status(204).json(users);
            }
            res.status(206).json(users);
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


// Find users by email
router.post('/find/by/phone-number', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }
        const { skip, limit } = paginationQuery(req.query);
        const phoneNumber = req.body.phoneNumber;

        User.find({
            $or: [
                {
                    phoneNumber: {$regex: phoneNumber, $options: 'i'}
                }
            ]
        }).limit(limit).skip(skip).then(users => {
            if(users.length === 0){
                return res.status(404).json({
                    message: `User not found for ${phoneNumber} number`
                });
            }
            res.status(206).json(users);
        }).catch(error => {
            res.status(500).json(error);
        });
    });
});


// Find all beautician by experience
router.post('/find/beautician/by/experience', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'SUPER_ADMIN'}, (err, doc) => {
        if(err){
            return res.status(500).json(err);
        }
        if(!doc){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }

        const { skip, limit } = paginationQuery(req.query);
        const exp_level = req.body.exp_level;
        // Find Query
        User.find({exp_level: exp_level})
            .where('userType')
            .equals('BEAUTICIAN')
            .limit(limit)
            .skip(skip)
            .then(users => {
                if(users.length === 0){
                    return res.status(404).json({
                        message: `Beautician not found`
                    });
                }
                res.status(206).json(users);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });
});


// Find all beauticians
router.get('/find/all/beautician', (req, res) => {
    const { skip, limit } = paginationQuery(req.query);
    // Find Query
    User.find({userType: 'BEAUTICIAN'})
        .limit(limit)
        .skip(skip)
        .then(users => {
            if(users.length === 0){
                return res.status(404).json({
                    message: `Beautician not found`
                });
            }
            res.status(206).json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// Find all beauticians
router.get('/find/all/general', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}).where('userType').equals('SUPER_ADMIN').then((admin) => {
        if(!admin){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            })
        }
        const { skip, limit } = paginationQuery(req.query);
        // Find Query
        User.find({userType: 'USER'})
            .limit(limit)
            .skip(skip)
            .then(users => {
                if(users.length === 0){
                    return res.status(404).json({
                        message: `User not found`
                    });
                }
                res.status(206).json(users);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    })
});


// Get total users
router.get('/total', (req, res) => {
    User.find()
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
});

// Get total clients or general users
router.get('/total-clients', (req, res) => {
    User.find()
        .where('userType')
        .equals('USER')
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
});


// Get total beauticians
router.get('/total-beauticians', (req, res) => {
    User.find()
        .where('userType')
        .equals('BEAUTICIAN')
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
})


// Get total therapists
router.get('/total-therapists', (req, res) => {
    User.find()
        .where('userType')
        .equals('THERAPISTS')
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
})


// Get total barber
router.get('/total-barber', (req, res) => {
    User.find()
        .where('userType')
        .equals('BARBER')
        .count((err, count) => {
            if(err){
                return res.status(500).json(err);
            }
            res.status(200).json(count);
        });
});


// Update Beautician Schedule
router.post('/update/beautician-schedule', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id, userType: 'BEAUTICIAN'}).then(user => {
        if(!user){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const { friday, saturday, sunday, monday, tuesday, wednesday, thursday } = req.body;
        user.schedule = {
            friday: {
                nineAm: friday.nineAm,
                tenAm: friday.tenAm,
                elevenAm: friday.elevenAm,
                twelvePm: friday.twelvePm,
                onePm: friday.onePm,
                twoPm: friday.twoPm,
                threePm: friday.threePm,
                fourPm: friday.fourPm,
                fivePm: friday.fivePm,
                sixPm: friday.sixPm,
            },
            saturday: {
                nineAm: saturday.nineAm,
                tenAm: saturday.tenAm,
                elevenAm: saturday.elevenAm,
                twelvePm: saturday.twelvePm,
                onePm: saturday.onePm,
                twoPm: saturday.twoPm,
                threePm: saturday.threePm,
                fourPm: saturday.fourPm,
                fivePm: saturday.fivePm,
                sixPm: saturday.sixPm,
            },
            sunday: {
                nineAm: sunday.nineAm,
                tenAm: sunday.tenAm,
                elevenAm: sunday.elevenAm,
                twelvePm: sunday.twelvePm,
                onePm: sunday.onePm,
                twoPm: sunday.twoPm,
                threePm: sunday.threePm,
                fourPm: sunday.fourPm,
                fivePm: sunday.fivePm,
                sixPm: sunday.sixPm,
            },
            monday: {
                nineAm: monday.nineAm,
                tenAm: monday.tenAm,
                elevenAm: monday.elevenAm,
                twelvePm: monday.twelvePm,
                onePm: monday.onePm,
                twoPm: monday.twoPm,
                threePm: monday.threePm,
                fourPm: monday.fourPm,
                fivePm: monday.fivePm,
                sixPm: monday.sixPm,
            },
            tuesday: {
                nineAm: tuesday.nineAm,
                tenAm: tuesday.tenAm,
                elevenAm: tuesday.elevenAm,
                twelvePm: tuesday.twelvePm,
                onePm: tuesday.onePm,
                twoPm: tuesday.twoPm,
                threePm: tuesday.threePm,
                fourPm: tuesday.fourPm,
                fivePm: tuesday.fivePm,
                sixPm: tuesday.sixPm,
            },
            wednesday: {
                nineAm: wednesday.nineAm,
                tenAm: wednesday.tenAm,
                elevenAm: wednesday.elevenAm,
                twelvePm: wednesday.twelvePm,
                onePm: wednesday.onePm,
                twoPm: wednesday.twoPm,
                threePm: wednesday.threePm,
                fourPm: wednesday.fourPm,
                fivePm: wednesday.fivePm,
                sixPm: wednesday.sixPm,
            },
            thursday: {
                nineAm: thursday.nineAm,
                tenAm: thursday.tenAm,
                elevenAm: thursday.elevenAm,
                twelvePm: thursday.twelvePm,
                onePm: thursday.onePm,
                twoPm: thursday.twoPm,
                threePm: thursday.threePm,
                fourPm: thursday.fourPm,
                fivePm: thursday.fivePm,
                sixPm: thursday.sixPm,
            }
        }
        user.save().then(updatedSchedule => {
            res.status(202).json(updatedSchedule);
        }).catch(error => {
            res.status(500).json(error);
        });

    }).catch(error => {
        res.status(500).json(error);
    });
});


// Change User Type
router.post('/change/user-type', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}, (err, user) => {
       if(err){
           return res.status(500).json(err);
       }
       if(!user){
           return res.status(401).json({message: 'Unauthorized'});
       }

       user.userType = req.body.userType.toUpperCase();
       user.updatedAt = Date.now();
       user.save().then(updatedUser => {
           res.status(202).json(updatedUser);
       }).catch(error => {
           res.status(500).json(error);
       });
    });
});


// User state change by user ID
router.post('/update/state/by/id/:id', authenticated(), (req, res) => {
    User.findOne({_id: req.user.id}).where('userType').equals('SUPER_ADMIN').then(user => {
        if(!user){
            return res.status(400).json({
                message: 'You have no permission for this operation. Only for Super Admin'
            });
        }
        const state = req.body.state.toUpperCase();
        if(state !== 'ACTIVE' && state !== 'DELETED' && state !== 'DISABLED'){
            return res.status(400).json({
                message: 'Your provided state is unknown. It only allowed for ACTIVE, DELETED and DISABLED'
            })
        }

        User.findOne({_id: req.params.id}, (err, innerUser) => {
            if(err){
                return res.status(500).json(err);
            }
            if(!innerUser){
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            innerUser.state = state;
            innerUser.save().then(updatedUser => {
                res.status(202).json(updatedUser);
            }).catch(error => {
                res.status(500).json(error);
            });
        });
    }).catch(error => {
        res.status(500).json(error);
    });
});


// Find User By User Account ID
router.get('/find/by/id/:id', (req, res) => {
   User.findOne({_id: req.params.id}, (err, user) => {
       if(err){
           return res.status(500).json(err);
       }
       if(!user){
           return res.status(400).json({
               message: 'User not found'
           })
       }
       res.status(200).json(user);
   })
});


// User Register or Not
router.get('/is-user-registered', (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }
        if(user){
            return res.status(400).json(true);
        }else{
            return res.status(400).json(false)
        }
    })
});


// Update user date time schedule
router.get('/update/date-time-schedule', (req, res) => {
    const userId = req.body.userId;
    User.findOne({_id: userId}, (err, user) => {
        if(err){
            return res.status(500).json(err);
        }

        if(user){
            return res.status(400).json(true);
        }else{
            return res.status(400).json(false)
        }
    })
});


module.exports = router;