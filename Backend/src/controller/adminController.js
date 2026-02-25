import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";


export const adminLogin = asyncHandler(async (req, res, next) => {
  console.log("--- Login Attempt ---");
  console.log("Request Body:", req.body);
  const { email, password } = req.body;

  const adminCollection = mongoose.connection.collection("admins");

  const admin = await adminCollection.findOne({ email });

  console.log(`Login attempt for email: ${email}`);

  if (!admin) {
    console.log(`Admin not found for email: ${email}`);
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    console.log(`Password mismatch for admin: ${email}`);
    return res.status(400).json({ message: "Invalid credentials" });
  }

  console.log(`Login successful for: ${email}`);

  const token = jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Admin login successful",
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      firstName: admin.firstName,
      lastName: admin.lastName
    }
  });
});

export const adminProfile = asyncHandler(async (req, res, next) => {
  const adminCollection = mongoose.connection.collection("admins");

  const admin = await adminCollection.findOne({
    email: req.admin.email,
  });

  res.status(200).json({
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    phone: admin.phone,
  });
});


export const adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  return res.status(200).json({
    success: true,
    message: "Admin logged out successfully"
  });
};
