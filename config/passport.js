const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../model/user');

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secret_key;

module.exports = passport => {
    passport.use(
        new Strategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        done(null, user);
                    }else{
                        done(null, false);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        })
    )
}

