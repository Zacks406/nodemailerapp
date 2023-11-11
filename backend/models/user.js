const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: null,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
  {
    collection: "users", //collection name
  }
);

module.exports = mongoose.model("User", UserSchema);
