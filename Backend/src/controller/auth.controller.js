import bcrypt from 'bcryptjs';
import User from '../models/user.models.js'
import { generateToken } from '../lib/util.js'
import { sendOTPEmail } from '../lib/sendemail.js';
import crypto from "crypto";

export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Try sending OTP email first
    try {
      await sendOTPEmail(email, otp);
    } catch (err) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    // Save user only if email was sent successfully
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await newUser.save();
    res.status(201).json({ message: "OTP sent to your email. Please verify to complete signup." });
  } catch (error) {
    console.error("Signup error:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
    const {email, password, username} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id:user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
             message: "Login Successfully"
        })

    } catch (error) {
        console.log("Error in the login Controller: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const Logout = async (req, res) => {
   try {
     res.cookie("token", " ", {maxtime: 0})
    res.status(200).json({message: "User Logged out Successfully"})
   } catch (error) {
    console.log("Error in the Logout", error);
    res.status(500).json({message: "Internal server error"})    
   }
}

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // const otpFromUser = otp.toString().trim();
    // const otpInDb = user.otp.toString().trim();


 if (!user.otp || user.otp.toString().trim() !== otp.toString().trim()) {
  return res.status(400).json({ message: "Invalid OTP" });
}

if (!user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
  return res.status(400).json({ message: "OTP expired" });
}
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// ---------------- Forgot Password ----------------

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendOTPEmail(email, `Click this link to reset password: ${resetLink}`);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ---------------- Reset Password ----------------
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }, // token not expired
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token and expiry
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




