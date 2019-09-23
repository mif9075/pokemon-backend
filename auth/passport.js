
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../routes/users/models/User');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken;
opts.secretOrKey = keys;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        User.findById(jwt_payload.id)
        .then(user =>{
            if(user){
                return done(null, user);
            }
            return done(null, false)
        })
        .catch(error =>{
            throw error
        })
    }))
}