var jwt = require("jsonwebtoken");
var jwtP = require("./authenticateJWT");

exports.authenticateJWTRefresh = function (req, res, _) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
        const refreshToken = authHeader.split(" ")[1];
        secret = process.env.USER_JWT_SECRET_REFRESH
		jwt.verify(refreshToken, secret, function (err, user) {
			if (err) {
				return res.sendStatus(403);
			}
			let new_token = jwtP.userJWT(user)
			return  res.status(200).json({accessToken: new_token, refreshToken: refreshToken})
		});
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
};

exports.userJWTRefresh = function (user) {
	return jwt.sign(
		{
			id: user.id,
		},
		process.env.USER_JWT_SECRET_REFRESH,
		{
			expiresIn: "1d",
		}
	)
};
