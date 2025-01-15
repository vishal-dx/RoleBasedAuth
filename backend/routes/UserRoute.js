const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
});

router.get("/user", verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
