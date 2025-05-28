const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./middelware/db");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();
app.use(cookieParser());

const authRoutes = require("./routes/authRoute");
const blogRoutes = require("./routes/blogRoute");
const userRoutes = require("./routes/userRoute");
const { isAuthenticated } = require("./middelware/auth");

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/blog", isAuthenticated, blogRoutes);
app.use("/api/admin", isAuthenticated, userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(3000, () => {
  console.log("Server run in 3000 port");
});
