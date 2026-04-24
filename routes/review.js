const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAuthor, validateReview, sanitizeReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// POST /listings/:id/reviews - Create a new review for a listing
router
  .route("/")
  .post(isLoggedIn, sanitizeReview, validateReview, wrapAsync(reviewController.createReview));

// DELETE /listings/:id/reviews/:reviewId - Delete a review
router
  .route("/:reviewId")
  .delete(isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;