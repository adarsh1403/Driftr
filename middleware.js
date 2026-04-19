const Listing = require("./models/listing");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // store the original URL the user was trying to access
        req.flash("error", "You must be signed in to do that!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // make the redirect URL available in res.locals for access in templates
        delete req.session.redirectUrl; // clear the redirect URL from session after using it
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing || !listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect("/listings/" + id);
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findById(id).populate({ "path": "reviews", populate: { path: "author" } });
    const review = listing.reviews.id(reviewId);
    if (!review || !review.author._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect("/listings/" + listing._id);
    }
    next();
};
