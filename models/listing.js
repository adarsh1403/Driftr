// defining schema for listing , making and exporting model of listing

// requiring mongoose
const mongoose = require("mongoose");
// requiring review model for post mongoose middleware
const Review = require("./review.js");

// defining schema for listing
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,

    // default-> when no image is given 
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",

    // set-> when image given but is an empty string 
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// post mongoose middleware for deleting all reviews associated with a listing when the listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({
      _id: {
        $in: listing.reviews,
      },
    });
  }
});

// defining model for listing 
// Listing is a Mongoose model stored in a JS variable (of constant type)
// Listing inside model() is the name of the model
// Listing model of mongoose will be converted to "listings" (lowercase and plural) collection in MongoDB
const Listing = mongoose.model("Listing", listingSchema);

//exporting the Listing model
module.exports = Listing;
