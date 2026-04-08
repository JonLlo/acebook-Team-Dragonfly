const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    surname: { type: String, required: false },
    userImage: { type: String, default: "../public/images/defaultAvatar" }, //Update to correct file path
    userBiography: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    notificationsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //Might not be used
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
