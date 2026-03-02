import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const BASE_URL = process.env.CLIENT_URL || "http://localhost:5000";

export async function sendVerificationEmail(
  email: string,
  token: string,
): Promise<void> {
  const verifyUrl = `${BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"LUMINA" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Verify your email - LUMINA",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; text-align: center;">Welcome to LUMINA</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5;">
          Thank you for creating an account. Please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}"
             style="background-color: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Verify Email
          </a>
        </div>
        <p style="color: #888; font-size: 14px;">
          This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
): Promise<void> {
  const resetUrl = `${BASE_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"LUMINA" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Reset your password - LUMINA",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; text-align: center;">Password Reset</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5;">
          You requested a password reset. Click the button below to set a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}"
             style="background-color: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #888; font-size: 14px;">
          This link expires in 30 minutes. If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
