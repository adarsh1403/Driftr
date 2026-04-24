const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  savedListings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

// This plugin adds username, hash and salt fields and also adds some methods to the UserSchema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
