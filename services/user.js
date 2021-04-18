var User = require("../models/mongo/user");
var bcrypt = require("bcryptjs");
let jwt = require("./auth/authenticateJWT");
let jwtRefresh = require("./auth/authenticateJWTRefresh");

exports.UserSignUpSignIn = async function (user) {
	let userRetrieved, userLoggedIn;
	if (user.email)
		userRetrieved = await User.findOne({ email: user.email });
	else userRetrieved = await User.findOne({ name: user.name });
	if (!userRetrieved) {
		// SignUp
		let hashedPassword = bcrypt.hashSync(user.password, 10);
		let newUser = new User({
			name: user.name,
			email: user.email,
			password: hashedPassword,
			date: Date()
		});
		userLoggedIn = await newUser.save();
	} else {
		// SignIn
		if (!bcrypt.compareSync(user.password, userRetrieved.password))
			throw Error("Invalid name or email and password");
		else userLoggedIn = userRetrieved;
	}
	let accessToken = jwt.userJWT(userLoggedIn);
	userLoggedIn.last_token = accessToken;
	userLoggedIn.save();
	let refreshToken = jwtRefresh.userJWTRefresh(userLoggedIn);
	return {accessToken: accessToken, refreshToken: refreshToken};
};

exports.userDetails = async function (user) {
	let userRetrieved = await User.findById(user.id);
	return userRetrieved
};

exports.userLastToken = async function (user) {
	let userRetrieved = await User.findById(user.id);
	return userRetrieved.last_token;
};

exports.userLogout = async function (user) {
	let userRetrieved = await User.findById(user.id);
	userRetrieved.last_token = null;
	userRetrieved.save();
}


