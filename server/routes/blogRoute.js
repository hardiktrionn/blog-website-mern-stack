const express = require("express");

const route = express.Router();

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getSingleUserBlogs,getSearchBlog
} = require("../controller/blogController");
const uploadMiddleware = require("../middelware/multer");
const blogValidator = require("../validator/blogValidator");

route.post("/create", uploadMiddleware, blogValidator, createBlog);
route.get("/all", getAllBlogs);
route.get("/user", getSingleUserBlogs);
route.get("",getSearchBlog)
route.get("/:id", getSingleBlog);
route.put("/update/:id", uploadMiddleware, blogValidator, updateBlog);
route.delete("/delete/:id", deleteBlog);

module.exports = route;
