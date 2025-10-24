const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});


async function otpSend(userMail,userName,otp){
    let htmlContent = `
          <div style="font-family: Arial, sans-serif; background: #000000; padding: 24px;">
        <div style="max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden; background: #0b0b0b; border: 1px solid rgba(255,255,255,0.04); box-shadow: 0 6px 18px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <div style="background: #070707; padding: 20px; text-align: center; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.03);">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.4px;">
              <span style="color: #e11d48;">Jio</span><span style="color:#ffffff;">-Clone</span>
            </h1>
          </div>

          <!-- Body -->
          <div style="padding: 24px; color: #d1d5db; line-height: 1.5; background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent);">
            <p style="font-size: 15px; color: #e5e7eb; margin: 0 0 12px 0;">
              Hello <strong style="color:#ffffff">${userName}</strong>,
            </p>
            <p style="margin: 0 0 18px 0; color:#cbd5e1;">
              Thank you for using <strong style="color:#ffffff">Jio-Clone</strong>. Use the OTP below to verify your account.
            </p>

            <!-- OTP Box -->
            <div style="text-align: center; margin: 22px 0;">
              <div style="display: inline-block; padding: 16px 34px; border-radius: 10px; border: 2px dashed #e11d48; background: rgba(225,29,72,0.04); font-size: 26px; font-weight: 700; letter-spacing: 6px; color: #e11d48;">
                ${otp}
              </div>
            </div>

            <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 8px 0 0 0;">
              This OTP will expire in <strong style="color:#ffffff">10 minutes</strong>. Do not share it with anyone.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #070707; text-align: center; padding: 14px; font-size: 13px; color: #9ca3af; border-top: 1px solid rgba(255,255,255,0.02);">
            &copy; 2025 Jio-Clone. All rights reserved.
          </div>
        </div>
      </div>
        `;

    const info = await transporter.sendMail({
    // from: 'arnabdutta8584@gmail.com',
    to: userMail,
    subject: "Welcome To Jio-CLONE",
    html: htmlContent, // HTML body
  });

  console.log("Message sent:", info.messageId);
}

module.exports=otpSend;