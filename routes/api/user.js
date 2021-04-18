express = require("express");
router = express.Router();
let UserController = require("../../controllers/user");
let jwt = require("../../services/auth/authenticateJWT");
let jwtRefresh = require("../../services/auth/authenticateJWTRefresh");

router.post("/authenticate", UserController.signUpSignIn);
router.get("/refresh", jwtRefresh.authenticateJWTRefresh);
router.get("/logout", jwt.authenticateJWT, UserController.logout);
router.get("/details", jwt.authenticateJWT, UserController.userDetails);

module.exports = router;
