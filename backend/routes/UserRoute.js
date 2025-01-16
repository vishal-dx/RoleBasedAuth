const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");
const { getAllData, makeAdmin, toggleUserRole } = require("../controllers/adminController");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);

// User profile routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

// Admin routes
router.get("/admin", verifyToken, isAdmin, getAllData);

router.put("/admin/toggle-role/:userId", verifyToken, isAdmin, toggleUserRole);


router.get("/user", verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
