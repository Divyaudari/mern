import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isMFAEnabled: { type: Boolean, default: false },  // Flag for MFA
  otp: { type: String },  // Store OTP temporarily
  otpExpires: { type: Date },  // OTP expiration time
});

const User = mongoose.model("User", userSchema);
export default User;
