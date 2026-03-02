import { Router, type Request, type Response } from "express";
import { User } from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";
import { setAuthCookies } from "../lib/cookies";

const router = Router();

const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || "";
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || "";
const TIKTOK_REDIRECT_URI =
  (process.env.CLIENT_URL || "http://localhost:5000") +
  "/api/auth/tiktok/callback";

// GET /api/auth/tiktok — redirect to TikTok authorization
router.get("/tiktok", (_req: Request, res: Response) => {
  if (!TIKTOK_CLIENT_KEY) {
    return res.redirect("/login?error=tiktok_not_configured");
  }

  const csrfState = Math.random().toString(36).substring(2);
  res.cookie("tiktok_csrf", csrfState, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
  });

  const params = new URLSearchParams({
    client_key: TIKTOK_CLIENT_KEY,
    scope: "user.info.basic",
    response_type: "code",
    redirect_uri: TIKTOK_REDIRECT_URI,
    state: csrfState,
  });

  return res.redirect(
    `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`,
  );
});

// GET /api/auth/tiktok/callback — handle TikTok OAuth callback
router.get("/tiktok/callback", async (req: Request, res: Response) => {
  const { code, state, error } = req.query;

  if (error || !code) {
    return res.redirect("/login?error=tiktok");
  }

  // Verify CSRF state
  const savedState = req.cookies?.tiktok_csrf;
  if (!savedState || savedState !== state) {
    return res.redirect("/login?error=tiktok_csrf");
  }
  res.clearCookie("tiktok_csrf");

  try {
    // Exchange code for access token
    const tokenRes = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_key: TIKTOK_CLIENT_KEY,
          client_secret: TIKTOK_CLIENT_SECRET,
          code: code as string,
          grant_type: "authorization_code",
          redirect_uri: TIKTOK_REDIRECT_URI,
        }),
      },
    );

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.redirect("/login?error=tiktok_token");
    }

    // Fetch user info
    const userRes = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    const userData = await userRes.json();
    const tiktokUser = userData.data?.user;

    if (!tiktokUser?.open_id) {
      return res.redirect("/login?error=tiktok_user");
    }

    // Find or create user
    let user = await User.findOne({
      provider: "tiktok",
      providerId: tiktokUser.open_id,
    });

    if (!user) {
      user = await User.create({
        name: tiktokUser.display_name || "TikTok User",
        email: `tiktok_${tiktokUser.open_id}@placeholder.com`,
        provider: "tiktok",
        providerId: tiktokUser.open_id,
        avatar: tiktokUser.avatar_url,
        isVerified: true,
      });
    }

    const payload = { userId: user._id.toString(), role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);
    return res.redirect("/");
  } catch (err) {
    console.error("TikTok OAuth error:", err);
    return res.redirect("/login?error=tiktok");
  }
});

export default router;
