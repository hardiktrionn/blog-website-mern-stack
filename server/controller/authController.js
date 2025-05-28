const User = require("../schema/userSchema");
const generateToken = require("../utils/generateToken");
const bycrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const removeImage = require("../utils/removeImage");

const registerUser = async (req, res) => {
  let inserted = false;
  const fileName = req.file?.filename || null;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(422).json({ success: 0, message: firstError });
    }

    const { name, email, password, role, username } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res
        .status(400)
        .json({ success: false, message: "UserName already exists" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const hashPassword = await bycrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      username,
      password: hashPassword,
      picture: fileName,
      role,
      username,
    });
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "User registration failed" });

    let token = generateToken({ _id: user._id, role });
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie expires in 7 days
    user.password = undefined;

    inserted = true;
    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (!inserted) removeImage(fileName);
  }
};
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return res.status(400).json({ success: 0, message: firstError });
  }

  const { email, password, role } = req.body;

  try {
    // Validate input
    if (!email || !password)
      res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });

    const user = await User.findOne({ email, role });
    if (!user)
      res.status(401).json({ success: false, message: "Invalid credentials" });

    // Check password
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid)
      res.status(401).json({ success: false, message: "Invalid credentials" });

    user.password = undefined; // Remove password from user object
    let token = generateToken({ _id: user._id, role });
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie expires in 7 days
    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password")
      .populate("blogs");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUserDetails = async (req, res) => {
  let userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return res.status(422).json({ success: 0, message: firstError });
  }

  if (req.user.role == "admin") {
    userId = req.params.id;
  } else {
    userId = req.user._id;
  }
  let find = await User.findById(userId);

  if (!find)
    return res.status(404).json({ success: false, message: "User not found" });

  const { name } = req.body;
  const fileName = req.file?.filename || find.picture;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, picture: fileName },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(500).json({ success: false, message: "Update failed" });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  getUserData,
};
