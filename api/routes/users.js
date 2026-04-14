const tokenChecker = require("../middleware/tokenChecker");
const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/me", tokenChecker, UsersController.getUserProfile);
router.patch("/:id", tokenChecker, UsersController.editUserProfile);

module.exports = router;
