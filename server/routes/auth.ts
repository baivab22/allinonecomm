import { Router, type Request, type Response } from "express";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../shared/schema";
import {
  createLocalUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  comparePassword,
} from "../storage";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
} from "../lib/jwt";
import { setAuthCookies, clearAuthCookies } from "../lib/cookies";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../lib/email";
import { requireAuth } from "../middleware/auth";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, password, phone } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const user = await createLocalUser({ name, email, password, phone });

  // Send verification email (non-blocking)
  const verificationToken = generateEmailVerificationToken(
    user._id.toString(),
  );
  sendVerificationEmail(email, verificationToken).catch((err) =>
    console.error("Failed to send verification email:", err),
  );

  const payload = { userId: user._id.toString(), role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  setAuthCookies(res, accessToken, refreshToken);

  return res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
    },
    message: "Registration successful. Please verify your email.",
  });
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { email, password, rememberMe } = parsed.data;
  const user = await findUserByEmailWithPassword(email);

  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const payload = { userId: user._id.toString(), role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload, rememberMe);

  user.refreshToken = refreshToken;
  await user.save();

  setAuthCookies(res, accessToken, refreshToken);

  return res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
    },
  });
});

// POST /api/auth/refresh
router.post("/refresh", async (req: Request, res: Response) => {
  const token = req.cookies?.refresh_token;
  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.userId).select("+refreshToken");

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const payload = { userId: user._id.toString(), role: user.role };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    setAuthCookies(res, newAccessToken, newRefreshToken);
    return res.json({ message: "Token refreshed" });
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// POST /api/auth/logout
router.post("/logout", requireAuth, async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.user!.userId, { refreshToken: null });
  clearAuthCookies(res);
  return res.json({ message: "Logged out" });
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      provider: user.provider,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
    },
  });
});

// GET /api/auth/verify-email
router.get("/verify-email", async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Missing verification token" });
  }

  try {
    const { userId } = verifyEmailVerificationToken(token);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.redirect("/?verified=already");
    }

    user.isVerified = true;
    await user.save();

    return res.redirect("/?verified=true");
  } catch {
    return res.redirect("/?verified=error");
  }
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req: Request, res: Response) => {
  const parsed = forgotPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { email } = parsed.data;
  const user = await findUserByEmail(email);

  // Always return success to prevent email enumeration
  if (!user) {
    return res.json({
      message: "If an account exists, a reset link has been sent.",
    });
  }

  const resetToken = generatePasswordResetToken(user._id.toString());
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);
  await user.save();

  sendPasswordResetEmail(email, resetToken).catch((err) =>
    console.error("Failed to send reset email:", err),
  );

  return res.json({
    message: "If an account exists, a reset link has been sent.",
  });
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req: Request, res: Response) => {
  const parsed = resetPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { token, password } = parsed.data;

  try {
    const { userId } = verifyPasswordResetToken(token);
    const user = await User.findById(userId).select(
      "+resetPasswordToken +resetPasswordExpires",
    );

    if (
      !user ||
      user.resetPasswordToken !== token ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.refreshToken = undefined;
    await user.save();

    return res.json({
      message: "Password reset successful. Please log in with your new password.",
    });
  } catch {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login?error=google" }),
  async (req: Request, res: Response) => {
    const user = req.user as any;
    const payload = { userId: user._id.toString(), role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);
    return res.redirect("/");
  },
);

// Facebook OAuth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"], session: false }),
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: "/login?error=facebook" }),
  async (req: Request, res: Response) => {
    const user = req.user as any;
    const payload = { userId: user._id.toString(), role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);
    return res.redirect("/");
  },
);

export default router;
