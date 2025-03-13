import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendOTP from '../utils/sendOTP.js'; // Utility function to send OTP
import OTPModel from '../models/OTP.js'; // OTP schema

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if MFA is enabled
        if (user.isMFAEnabled) {
            const otpCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 mins

            // Save OTP in database
            await OTPModel.create({ email: user.email, otp: otpCode, expiresAt: otpExpiry });

            // Send OTP to user
            await sendOTP(user.email, otpCode);

            return res.status(200).json({ message: 'OTP sent. Please verify.', requiresOTP: true });
        }

        // Generate JWT token if MFA is not enabled
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find OTP in the database
        const otpRecord = await OTPModel.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (new Date() > otpRecord.expiresAt) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // Delete OTP after successful verification
        await OTPModel.deleteOne({ email, otp });

        // Generate JWT Token after OTP verification
        const user = await User.findOne({ email });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'OTP verified. Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
