const tokenChecker = require("../middleware/tokenChecker")
const express = require("express");
const upload = require("../middleware/multerStorage");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", upload.single("userImage"), UsersController.create);
router.get("/me", tokenChecker, UsersController.getUserProfile);
// router.patch("/:id", tokenChecker, upload.single("userImage"), UsersController.editUserProfile);
router.patch("/:id", tokenChecker, (req, res, next) => {
  upload.single("userImage")(req, res, (err) => {
    if (err) {
      console.log("MULTER ERROR:", err);
    }
    next();
  });
}, UsersController.editUserProfile);

module.exports = router;
