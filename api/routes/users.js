const tokenChecker = require("../middleware/tokenChecker")
const express = require("express");
const upload = require("../middleware/multerStorage");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", upload.single("userImage"), UsersController.create);
router.get("/me", tokenChecker, UsersController.getUserProfile);
router.patch("/:id", tokenChecker, upload.single("userImage"), UsersController.editUserProfile);

module.exports = router;
