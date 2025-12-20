const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Auth Routes
router.post("/register", upload.single("profileImage"), registerUser); // Use multer here
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
