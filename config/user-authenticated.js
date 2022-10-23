const passport = require('passport');

// Is authenticated function
const isAuthenticated = () => {
    return passport.authenticate('jwt', {session: false});
}
module.exports = isAuthenticated;