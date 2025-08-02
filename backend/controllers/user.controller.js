import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isStrongPassword, isValidEmail } from "../utils/validators.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, referralCodeOptional } = req.body;

    if (referralCodeOptional) {
      try {
        const referrer = await User.findOne({
          referralCode: referralCodeOptional,
        });
        if (!referrer) {
          return res
            .status(400)
            .json({ sucess: false, message: "Invalid referral code" });
        }
        // Increment referral count for the referrer
        referrer.referralCount += 1;
        await referrer.save();
      } catch (error) {
        return res
          .status(400)
          .json({ sucess: false, message: "Invalid referral code" });
      }
    }

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if password is strong enough
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }
    // Check if email is valid
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create referral code
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 for shorter string
    const randomString = Math.random()
      .toString(36)
      .substring(2, 2 + 15); // Random alphanumeric string
    const referralCode = ("ref_" + timestamp + randomString)
      .substring(0, 15)
      .toUpperCase(); // Combine and truncate

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      referralCode: referralCode,
      profilePicture: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    const newUser = await user.save();

    // Generate JWT tokenconst
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ sucess: true, message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error in creating user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting user",
      error: error.message,
    });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    // Fetch users sorted by total donations if total donations is greater than 0 and if total donations is equal then sort by referral count in descending order
    const users = await User.find()
      .sort({
        totalDonations: -1,
        referralCount: -1,
      })
      .select("name totalDonations referralCount profilePicture");
    res.status(200).json({
      success: true,
      message: "Leaderboard fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching leaderboard",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
