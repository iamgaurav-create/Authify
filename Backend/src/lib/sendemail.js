import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  

const mailOptions = {
  from: `"Account Verification" <no-reply@myapp.com>`,
  replyTo: "no-reply@myapp.com",
  to: email,
  subject: "Your One-Time Password (OTP)",
  html: `
    <div style="margin:0; padding:0; background:#f4f7fa; font-family: 'Helvetica Neue', Arial, sans-serif; color:#333;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fa; padding:30px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:#1a73e8; padding:20px; text-align:center; color:#fff; font-size:22px; font-weight:bold;">
                  Account Verification
                </td>
              </tr>
              <tr>
                <td style="padding:30px; text-align:left;">
                  <h2 style="margin-top:0; color:#2c3e50; font-size:20px;">Hello,</h2>
                  <p style="font-size:16px; line-height:1.6; margin:15px 0; color:#444;">
                    To complete your verification, please use the following One-Time Password (OTP).
                    This code will expire in <strong>5 minutes</strong>.
                  </p>
                  <div style="text-align:center; margin:30px 0;">
                    <span style="display:inline-block; font-size:28px; font-weight:bold; color:#1a73e8; background:#eef4fe; border:2px dashed #1a73e8; padding:15px 25px; border-radius:8px; letter-spacing:6px;">
                      ${otp}
                    </span>
                  </div>
                  <p style="font-size:14px; color:#666; margin:20px 0;">
                    If you did not request this code, you can safely ignore this email or contact our support team for assistance.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background:#f9fafc; padding:20px; text-align:center; font-size:12px; color:#999;">
                  This is an automated message. <strong>Please do not reply to this email.</strong><br/>
                  © ${new Date().getFullYear()} Account Verification. All rights reserved.<br/>
                  Need help? <a href="mailto:gaurav115107@gmail.com" style="color:#1a73e8; text-decoration:none;">Contact Support</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `
};




    const info = await transporter.sendMail(mailOptions);
   

  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};
