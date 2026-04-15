const mongoose = require("mongoose");
const imageURL = "../images/";
// base URL for uploaded images from the backend uploads folder
const uploadsURL = `${process.env.BACKEND_URL}/uploads/`;  

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    userImage: {
      type: String,
      default: "defaultAvatar.png",
      get: (v) => {
        // if no value, return the default avatar
        if (!v) return `${imageURL}defaultAvatar.png`;
        // if the filename doesn't start with a number, it's the default avatar
        if (isNaN(v[0])) return `${imageURL}defaultAvatar.png`;
        // otherwise it's an uploaded image, return the full backend URL
        return `${uploadsURL}${v}`;
      }

      // get: (v) => {
      //   if (!v) return `${imageURL}defaultAvatar.png`;
      //   if (v.startsWith(imageURL)) return v;
      //   return `${imageURL}${v}`;
      // },
    },
    userBiography: { type: String, required: false },
    email: { type: String, required: true, unique: true },
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
