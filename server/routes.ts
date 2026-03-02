import type { Express } from "express";
import { type Server } from "http";
import passport from "passport";
import { configurePassport } from "./lib/passport";
import authRoutes from "./routes/auth";
import tiktokRoutes from "./routes/oauth-tiktok";
import userRoutes from "./routes/user";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Configure Passport OAuth strategies
  configurePassport();
  app.use(passport.initialize());

  // Auth routes
  app.use("/api/auth", authRoutes);
  app.use("/api/auth", tiktokRoutes);

  // User profile routes
  app.use("/api/user", userRoutes);

  return httpServer;
}
