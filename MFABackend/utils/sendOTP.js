import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendOTP = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
        });

        console.log(`OTP sent to ${email}: ${otp}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

export default sendOTP;
