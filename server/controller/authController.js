const User = require("../schema/userSchema");
const generateToken = require("../utils/generateToken");
const bycrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const removeImage = require("../utils/removeImage");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

const registerUser = async (req, res) => {
  let inserted = false;
  let error = [];
  const fileName = req.file?.filename || null;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ success: 0, message: errors.array() });
    }

    const { name, email, password, role, username } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      error.push({ path: "username", msg: "UserName already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      error.push({ path: "email", msg: "Email already exists" });
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

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
      return res.status(500).json({
        success: false,
        message: [{ path: "server", msg: "User registration failed" }],
      });

    let adminEmail = await User.findOne({ role: "admin" }).select("email");
    await sendMail(
      adminEmail.email,
      "New User Register",
      `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #ffffff;">
  <h2 style="text-align: center; color: #333;">👋 ${name} is New User</h2>
  <p style="font-size: 16px; color: #555;">Thers username is ${username},</p>
</div>
`
    );
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: "Server Error" }],
    });
  } finally {
    if (!inserted) removeImage(fileName);
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: 0, message: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    // Validate input
    const user = await User.findOne({ email, role });
    if (!user)
      res.status(401).json({
        success: false,
        message: [{ path: "server", msg: "User not found" }],
      });

    // Check password
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid)
      res.status(401).json({
        success: false,
        message: [{ path: "server", msg: " Invalid credentials" }],
      });

    user.password = undefined; // Remove password from user object
    let token = generateToken({ _id: user._id, role });
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie expires in 7 days
    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: " Server Error" }],
    });
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
    return res.status(422).json({ success: 0, message: errors.array() });
  }

  if (req.user.role == "admin") {
    userId = req.params.id;
  } else {
    userId = req.user._id;
  }
  let find = await User.findById(userId);

  if (!find)
    return res.status(404).json({
      success: false,
      message: [{ path: "server", msg: "User not found" }],
    });

  const { name } = req.body;
  const fileName = req.file?.filename || find.picture;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, picture: fileName },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(500).json({
        success: false,
        message: [{ path: "server", msg: "Update failed" }],
      });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePassword = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(422).json({ success: false, message: error.array() });

  const { password, newPassword } = req.body;
  try {
    let find = await User.findById(req.user._id);

    if (!find)
      return res.status(404).json({
        success: false,
        message: [{ path: "server", msg: "User Not found" }],
      });

    let isPasswordValid = await bycrypt.compare(password, find.password);

    if (!isPasswordValid)
      return res.status(404).json({
        success: false,
        message: [{ path: "server", msg: "Password in Wrong" }],
      });

    let hashPassword = await bycrypt.hash(newPassword, 10);

    find.password = hashPassword;

    await find.save();

    res.status(200).json({
      success: true,
      message: "Password is Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: " Server Error" }],
    });
  }
};

const forgetPassword = async (req, res) => {
  let error = validationResult(req);

  if (!error.isEmpty())
    return res.status(422).json({ success: false, message: error.array() });

  try {
    const { email } = req.body;
    let find = await User.findOne({ email });

    if (!find)
      return res.status(404).json({
        success: false,
        message: [{ path: "server", msg: "User Not found" }],
      });

    let token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    let resetlink = `${process.env.VITE_CLIENT_HOST}/verify-link?token=${token}`;
    // Email options
    await sendMail(
      email,
      "You requested to reset your password",
      `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
  <h2 style="text-align: center; color: #333;">🔗 Password Reset</h2>
  <p style="font-size: 16px; color: #555;">Hello,</p>
  <p style="font-size: 16px; color: #555;">You requested to reset your password. Click the button below to proceed:</p>
  <div style="text-align: center; margin: 20px 0;">
    <a href="${resetlink}" style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;" aria-label="Reset your password now">
      Reset Password
    </a>
  </div>
  <p style="font-size: 14px; color: #777;">This link is valid for <strong>5 minutes</strong>. Do not share this link with anyone.</p>
  <p style="font-size: 14px; color: #777;">Or paste this URL into your browser:<br>
    ${resetlink}
  </p>
  <hr style="border: none; border-top: 1px solid #ddd;">
  <p style="text-align: center; font-size: 12px; color: #999;">If you didn’t request this, please ignore this email or contact support.</p>
</div>
    `
    );

    res.status(200).json({
      success: true,
      message: "Link Sended",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: " Server Error" }],
    });
  }
};

const verifyLink = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    }

    let email;
    try {
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      email = decode.email;
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Token verified",
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const newPassword = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(422).json({ success: false, message: error.array() });

  const { password, token } = req.body;
  try {
    let email;

    try {
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      email = decode.email;
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    let find = await User.findOne({ email });

    if (!find)
      return res.status(404).json({
        success: false,
        message: [{ path: "server", msg: "User Not found" }],
      });

    let hashPassword = await bycrypt.hash(password, 10);

    find.password = hashPassword;

    await find.save();

    res.status(200).json({
      success: true,
      message: "Change the Password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: [{ path: "server", msg: " Server Error" }],
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  getUserData,
  updatePassword,
  forgetPassword,
  newPassword,
  verifyLink,
};
