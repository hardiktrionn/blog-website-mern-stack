const User = require("../schema/userSchema");
const Blog = require("../schema/blogSchema");
const removeImage = require("../utils/removeImage");

const getAllUsers = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin")
    return res.status(403).json({ success: false, message: "Access Denied" });

  try {
    let users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createAt: -1 });

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin")
    return res.status(403).json({ success: false, message: "Access Denied" });
  const { id } = req.params;

  let user = await User.findById(id);

  if (!user)
    return res.status(404).json({ success: false, message: "User Not Found" });

  if (user.picture) {
    removeImage(user.picture);
  }

  await User.findByIdAndDelete(id);

  await Blog.deleteMany({ userId: id });
  res
    .status(200)
    .json({ success: true, message: "Succefully Deleted the User" });

  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllUsers, deleteUser };
