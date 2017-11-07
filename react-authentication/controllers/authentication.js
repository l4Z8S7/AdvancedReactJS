const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function generateToken(user) {
	const timeStamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timeStamp}, config.jwtSecret)
}

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res.status(422).send({err: 'You must provide email and password'});
	}

	//see if a user with the given email exists
	User.findOne({email: email}, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		//if a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({err: 'Email is in use'});
		}

		//if a user with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: password
		});
		user.save(err => {
			if (err) {
				return next(err);
			}

			//response to request indicating the user was created
			res.json({token: generateToken(user)});
		});
	});	
}

exports.signin = (req, res, next) => {
	//user has had their email  and password auth'd, we need to give them a token
	res.send({token: generateToken(req.user)});
}
