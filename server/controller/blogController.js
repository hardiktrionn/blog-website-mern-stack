const BlogSchema = require("../schema/blogSchema");
const User = require("../schema/userSchema");
const removeImage = require("../utils/removeImage");
const { validationResult } = require("express-validator");

const createBlog = async (req, res) => {
  let inserted = false;
  const banner = req.file ? req.file.filename : null;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ success: 0, message: errors.array() });
    }

    const { title, description, category, privacy } = req.body;

    const newBlog = new BlogSchema({
      title,
      description,
      banner,
      category,
      privacy,
      userId: req.user._id,
    });

    await newBlog.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { blogs: newBlog._id },
    });

    inserted = true;
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: "Error creating blog" }],
    });
  } finally {
    if (!inserted) removeImage(banner);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let blogs = [];
    if (req?.user?.role == "admin") {
      blogs = await BlogSchema.find()
        .populate("userId", "name picture username")
        .sort({ createdAt: -1 });
    } else {
      blogs = await BlogSchema.find({ privacy: "public" })
        .populate("userId", "name picture username")
        .sort({ createdAt: -1 });
    }
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching blogs", error });
  }
};

const getSingleUserBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await BlogSchema.find({ userId })
      .populate("userId", "name picture username")
      .sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user blogs", error });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogSchema.findById(blogId).populate(
      "userId",
      "name picture username"
    );

    if (!blog)
      res.status(404).json({ success: false, message: "Blog not found" });

    if (
      blog.privacy === "private" &&
      blog.userId._id != req.user._id &&
      req.user.role != "admin"
    )
      res.status(403).json({
        success: false,
        message: "You do not have permission to view this blog",
      });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching blog", error });
  }
};
const updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ success: 0, message: errors.array() });
    }

    const blogId = req.params.id;

    const findBlog = await BlogSchema.findById(blogId);

    if (!findBlog)
      res.status(404).json({
        success: false,
        message: [{ path: "server", msg: "Blog not found" }],
      });

    const { title, description, category, privacy } = req.body;
    const banner = req.file ? req.file.filename : null;

    if (findBlog.userId != req.user._id && req.user.role != "admin")
      res.status(403).json({
        success: false,
        message: [
          {
            path: "server",
            msg: "You do not have permission to update this blog",
          },
        ],
      });

    if (banner) {
      removeImage(findBlog.banner);
      findBlog.banner = banner;
    }
    findBlog.title = title;
    findBlog.description = description;
    findBlog.category = category;
    findBlog.privacy = privacy;
    await findBlog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: findBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: "Error updating blog" }],
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await BlogSchema.findById(blogId);

    if (!blog)
      res.status(404).json({ success: false, message: "Blog not found" });

    if (blog?.userId != req.user._id && req.user.role != "admin")
      res.status(403).json({
        success: false,
        message: "You do not have permission to delete this blog",
      });

    await BlogSchema.findByIdAndDelete(blogId);

    await User.findByIdAndUpdate(req.user._id, { $pull: { blogs: blogId } });

    if (blog.banner) {
      removeImage(blog.banner);
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting blog", error });
  }
};

const getSearchBlog = async (req, res) => {
  const { search } = req.query;

  const data = await BlogSchema.find({
    $or: [
      {
        title: { $regex: search, $options: "i" },
      },
      {
        category: { $regex: search, $options: "i" },
      },
    ],
  }).populate("userId", "name picture username");

  res.status(200).json({ success: true, data });
};
module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getSingleUserBlogs,
  getSearchBlog,
};
