import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;
const DEFAULT_URL = '/scan'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith(DEFAULT_URL) ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(DEFAULT_URL, req.url));
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);

    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL(DEFAULT_URL, req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/dashboard/:path*"],
};
