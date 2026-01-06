import { parse, serialize } from "cookie";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) throw new Error("JWT_SECRET not defined");

export type DecodedToken = {
  username: string;
  role: string;
};

export function getTokenFromRequest(cookieHeader?: string): DecodedToken | null {
  if (!cookieHeader) return null;

  const cookies = parse(cookieHeader);
  const token = cookies.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as DecodedToken;
    return decoded;
  } catch (err) {
    return null;
  }
}

export function setTokenCookie(res: any, token: string) {
  const cookieStr = serialize("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  res.setHeader("Set-Cookie", cookieStr);
}
