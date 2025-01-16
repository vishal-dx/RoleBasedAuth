const UserSchema = require("../models/UserSchema");

const getAllData = async (req, res) => {
  try {
    const data = await UserSchema.find().select("-password");
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const makeAdmin = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ error: "User is already an admin" });
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({
      message: "User has been promoted to admin",
      data: user,
    });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const toggleUserRole = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await UserSchema.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Toggle the user's role
      user.role = user.role === "admin" ? "user" : "admin";
      await user.save();
  
      res.status(200).json({
        message: `User role updated to ${user.role}`,
        data: user,
      });
    } catch (error) {
      console.error("Error toggling user role:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
module.exports = { getAllData, makeAdmin, toggleUserRole };
