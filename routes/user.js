const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const { authLimiter } = require("../config/rateLimiter.js");
const userController = require("../controllers/users.js");

// GET /signup - Show signup form
// POST /signup - Handle user registration
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(authLimiter, wrapAsync(userController.signup));

// GET /login - Show login form
// POST /login - Handle user login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    authLimiter,
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

// GET /logout - Handle user logout
router.route("/logout").get(userController.logout);

module.exports = router;