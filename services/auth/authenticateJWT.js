let jwt = require("jsonwebtoken");
let userService = require("../user")

exports.authenticateJWT = function (req, res, next) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		let secret = process.env.USER_JWT_SECRET
		jwt.verify(token, secret, async function (err, user) {
			if (err) {
				return res.status(401).json({ message: "Unauthorized" });
			}
			userService.userLastToken(user).then(
				userLastToken => {
					if (userLastToken == token){
						req.user = user;
						next();
					}else {
						res.status(401).json({ message: "Unauthorized" });
					}
				}
			)
		});
	}else {
		res.status(401).json({ message: "Unauthorized" });
	}
};

exports.userJWT = function (user) {
	return jwt.sign(
		{
			id: user.id,
		},
		process.env.USER_JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
};
