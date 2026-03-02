import { Router, type Request, type Response } from "express";
import { updateProfileSchema, changePasswordSchema } from "../../shared/schema";
import { requireAuth } from "../middleware/auth";
import { User } from "../models/User";
import { comparePassword } from "../storage";
import bcrypt from "bcryptjs";
import multer from "multer";
import { uploadAvatar } from "../lib/cloudinary";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// PUT /api/user/profile
router.put("/profile", requireAuth, async (req: Request, res: Response) => {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user!.userId,
    { $set: parsed.data },
    { new: true },
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      provider: user.provider,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
    },
  });
});

// PUT /api/user/password
router.put("/password", requireAuth, async (req: Request, res: Response) => {
  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { currentPassword, newPassword } = parsed.data;
  const user = await User.findById(req.user!.userId).select("+password");

  if (!user || !user.password) {
    return res.status(400).json({
      message: "Cannot change password for social login accounts",
    });
  }

  const valid = await comparePassword(currentPassword, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return res.json({ message: "Password changed successfully" });
});

// POST /api/user/avatar
router.post(
  "/avatar",
  requireAuth,
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const avatarUrl = await uploadAvatar(
        req.file.buffer,
        req.user!.userId,
      );

      const user = await User.findByIdAndUpdate(
        req.user!.userId,
        { avatar: avatarUrl },
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ avatar: avatarUrl });
    } catch (err) {
      console.error("Avatar upload error:", err);
      return res.status(500).json({ message: "Failed to upload avatar" });
    }
  },
);

// GET /api/user/orders (placeholder)
router.get("/orders", requireAuth, async (_req: Request, res: Response) => {
  return res.json({ orders: [] });
});

export default router;
