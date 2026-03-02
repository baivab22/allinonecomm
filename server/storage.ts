import { User, type IUser } from "./models/User";
import bcrypt from "bcryptjs";

export async function findUserById(id: string): Promise<IUser | null> {
  return User.findById(id);
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email });
}

export async function findUserByEmailWithPassword(
  email: string,
): Promise<IUser | null> {
  return User.findOne({ email }).select("+password");
}

export async function findUserByProvider(
  provider: string,
  providerId: string,
): Promise<IUser | null> {
  return User.findOne({ provider, providerId });
}

export async function createLocalUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<IUser> {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  return User.create({
    ...data,
    password: hashedPassword,
    provider: "local",
  });
}

export async function comparePassword(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
