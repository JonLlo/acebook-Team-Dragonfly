const mongoose = require("mongoose");
const imageURL = "../images/";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true},
    surname: { type: String, required: true},
    userImage: { 
      type: String,
      default: "defaultAvatar.png",
      get: (v) => {
        if (!v) return `${imageURL}defaultAvatar.png`;
        if (v.startsWith(imageURL)) return v;
        return `${imageURL}${v}`;
      },
    },
    userBiography: { type: String, required: false },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    notificationsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //Might not be used
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
