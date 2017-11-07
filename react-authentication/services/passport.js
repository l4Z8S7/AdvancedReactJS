const passport = require('passport');
const localStrategy = require('passport-local');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const User = require('../models/user');

//create local strategy
const localOptions = {
	usernameField: 'email'
};

const localLogin = new localStrategy(localOptions, (email, password, done) => {
	//verify the email and password
	User.findOne({email}, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}

		//compare passwords
		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});

//setup options for JWT strategy
const jwtOptions = {
	jwtFromRequest: extractJwt.fromHeader('authorization'),
	secretOrKey: config.jwtSecret
};

//create JWT strategy
const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {
	//see if the user ID in the payload exists in the database
	User.findById(payload.sub, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);