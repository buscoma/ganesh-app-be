var express = require("express");
var router = express.Router();
var PluralsightController = require("../../../controllers/source/pluralsight");
var jwt = require("../../../services/auth/authenticateJWT");

router.get(
	"/pluralsight",
	jwt.authenticateJWT,
	PluralsightController.getAllCourses
);

router.get(
	"/pluralsight/:id",
	jwt.authenticateJWT,
	PluralsightController.getCourse
);

router.post(
	"/pluralsight",
	jwt.authenticateJWT,
	PluralsightController.updateCourses
);

module.exports = router;
