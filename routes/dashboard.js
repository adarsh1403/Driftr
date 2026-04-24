const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const dashboardController = require("../controllers/dashboard.js");
const { isLoggedIn } = require("../middleware.js");

// Get /trips - show user's trips
router.get(
  "/trips",
  isLoggedIn,
  wrapAsync(dashboardController.renderTrips)
);

// Get /reservations - show user's reservations
router.get(
  "/reservations",
  isLoggedIn,
  wrapAsync(dashboardController.renderReservations),
);

module.exports = router;
