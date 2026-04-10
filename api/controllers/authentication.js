const User = require("../models/user");
const { generateToken } = require("../lib/token");
const bcrypt = require("bcrypt");

async function createToken(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      console.log("Auth Error: User not found");
      res.status(401).json({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Auth Error: Passwords do not match");
        res.status(401).json({ message: "Password incorrect" });
      } else {
        const token = generateToken(user.id);
        res.status(201).json({ token: token, message: "OK" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
