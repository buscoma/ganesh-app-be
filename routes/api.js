const express = require("express");
const pluralsight = require("./api/source/pluralsight");
const user = require("./api/user");
const router = express.Router();

// user api
router.use(user);

// source api
[
	pluralsight,
].forEach((source) => router.use("/source", source));

module.exports = router;
