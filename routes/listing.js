const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, sanitizeListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../config/cloudinary.js");

// To-do: Error handling
// Configure multer for file uploads
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  },
});

// GET /listings - List all listings
// POST /listings - Create a new listing
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    sanitizeListing,
    validateListing,
    wrapAsync(listingController.createListing)
  );

// GET /listings/new - Show form to create a new listing
router
  .route("/new")
  .get(
    isLoggedIn,
    listingController.renderNewForm,
  );

// GET /listings/:id - Show a specific listing
// PUT /listings/:id - Update a listing
// DELETE /listings/:id - Delete a listing
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    sanitizeListing,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// GET /listings/:id/edit - Show form to edit a listing
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// PATCH /listings/:id/toggle-availability - Toggle listing availability
router.patch(
  "/:id/toggle-availability",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.toggleAvailability)
);

// POST /listings/:id/save - Save/unsave a listing for the user
router.post("/:id/save", isLoggedIn, wrapAsync(listingController.saveListing));

module.exports = router;
