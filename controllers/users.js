const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password); // Passport-local-mongoose's register method handles hashing and saving the user
    // Log the user in immediately after registration
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Driftr!");
      res.redirect("/listings");
    });
  } catch (err) {  // username uniqueness is handled by passport-local-mongoose, but we also want to catch duplicate email errors
    const msg =
      err.code === 11000
        ? "An account with that email already exists."
        : err.message;
    req.flash("error", msg);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out!");
    res.redirect("/listings");
  });
};