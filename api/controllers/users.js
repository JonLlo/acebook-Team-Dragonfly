const User = require("../models/user");
const bcrypt = require('bcrypt');





async function create(req, res) {
  try {
    const { email, password: plainTextPassword } = req.body;

    const password = await bcrypt.hash(plainTextPassword, 10);

    const user = new User({ email, password });

    const savedUser = await user.save();

    console.log("User created, id:", savedUser._id.toString());
    res.status(201).json({ message: "OK" });

  } catch (err) { 
    console.error("Error in create user:", err);
    res.status(400).json({ message: "Something went wrong" });
  }
}



const UsersController = {
  create: create,
};

module.exports = UsersController;
