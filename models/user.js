const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// require passport-local-mongoose package for handling user authentication and password hashing
const passportLocalMongoose = require("passport-local-mongoose").default;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  savedListings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing", // Make sure this matches your Listing model's exact name
    },
  ],
});
// plugin adds username and password fields to the schema and also adds methods for hashing and validating passwords.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
