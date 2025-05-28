const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { isAuthenticated };
