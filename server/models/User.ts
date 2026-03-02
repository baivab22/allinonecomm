import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: "customer" | "admin";
  provider: "local" | "google" | "facebook" | "tiktok";
  providerId?: string;
  avatar?: string;
  isVerified: boolean;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, select: false },
    phone: { type: String },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    provider: {
      type: String,
      enum: ["local", "google", "facebook", "tiktok"],
      default: "local",
    },
    providerId: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.index({ provider: 1, providerId: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
