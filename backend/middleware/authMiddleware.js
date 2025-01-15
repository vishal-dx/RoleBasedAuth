const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({ error: "Access denied" });
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
