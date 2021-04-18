let UserService = require("../services/user");

exports.signUpSignIn = async function (req, res, _) {
	if (!req.body.password || (!req.body.email && !req.body.name)) {
		return res
			.status(400)
			.json({ message: "Must specify name or email and password" });
	}
	let user = {
		name: req.body.name ? req.body.name : null,
		email: req.body.email ? req.body.email : null,
		password: req.body.password,
	};
	try {
		let response = await UserService.UserSignUpSignIn(user);
		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(401).json({ message: e.message });
	}
};

exports.logout = async function (req, res, _) {
	await UserService.UserLogout(req.user)
	return res.json({ message: "Success" })
}

exports.userDetails = async function (req, res, _) {
	try {
		let userDetails = await UserService.userDetails(req.user);
		return res.json(userDetails);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ message: e.message });
	}
};
