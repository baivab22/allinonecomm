import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../models/User";

async function findOrCreateOAuthUser(
  provider: "google" | "facebook" | "tiktok",
  providerId: string,
  email: string | undefined,
  name: string,
  avatar?: string,
) {
  // Check if user exists with this provider
  let user = await User.findOne({ provider, providerId });
  if (user) return user;

  // Check if user exists with same email (link accounts)
  if (email) {
    user = await User.findOne({ email });
    if (user) {
      user.provider = provider;
      user.providerId = providerId;
      user.avatar = user.avatar || avatar;
      user.isVerified = true;
      await user.save();
      return user;
    }
  }

  // Create new user
  return User.create({
    name,
    email: email || `${provider}_${providerId}@placeholder.com`,
    provider,
    providerId,
    avatar,
    isVerified: true,
  });
}

export function configurePassport(): void {
  // Google Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreateOAuthUser(
              "google",
              profile.id,
              profile.emails?.[0]?.value,
              profile.displayName,
              profile.photos?.[0]?.value,
            );
            done(null, user as any);
          } catch (err) {
            done(err as Error);
          }
        },
      ),
    );
  }

  // Facebook Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: "/api/auth/facebook/callback",
          profileFields: ["id", "displayName", "emails", "photos"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreateOAuthUser(
              "facebook",
              profile.id,
              profile.emails?.[0]?.value,
              profile.displayName,
              profile.photos?.[0]?.value,
            );
            done(null, user as any);
          } catch (err) {
            done(err as Error);
          }
        },
      ),
    );
  }
}
