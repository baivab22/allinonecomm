import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev-access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";

export interface TokenPayload {
  userId: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(
  payload: TokenPayload,
  rememberMe = false,
): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: rememberMe ? "30d" : "7d",
  });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
}

export function generateEmailVerificationToken(userId: string): string {
  return jwt.sign({ userId, purpose: "email-verification" }, ACCESS_SECRET, {
    expiresIn: "24h",
  });
}

export function verifyEmailVerificationToken(token: string): {
  userId: string;
} {
  const decoded = jwt.verify(token, ACCESS_SECRET) as {
    userId: string;
    purpose: string;
  };
  if (decoded.purpose !== "email-verification") {
    throw new Error("Invalid token purpose");
  }
  return { userId: decoded.userId };
}

export function generatePasswordResetToken(userId: string): string {
  return jwt.sign({ userId, purpose: "password-reset" }, ACCESS_SECRET, {
    expiresIn: "30m",
  });
}

export function verifyPasswordResetToken(token: string): { userId: string } {
  const decoded = jwt.verify(token, ACCESS_SECRET) as {
    userId: string;
    purpose: string;
  };
  if (decoded.purpose !== "password-reset") {
    throw new Error("Invalid token purpose");
  }
  return { userId: decoded.userId };
}
