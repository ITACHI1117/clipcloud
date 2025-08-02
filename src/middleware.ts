import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const userRole = req.cookies.get("user-role")?.value;

  const pathname = req.nextUrl.pathname;

  if (accessToken) {
    if (pathname === "/auth/login" || pathname === "/auth/signup") {
      if (userRole === "Creator") {
        return NextResponse.redirect(new URL("/creator", req.url));
      }
      if (userRole === "Consumer") {
        return NextResponse.redirect(new URL("/consumer", req.url));
      }
    }

    if (pathname.startsWith("/creator") && userRole !== "Creator") {
      return NextResponse.redirect(new URL("/consumer", req.url));
    }

    if (pathname.startsWith("/consumer") && userRole !== "Consumer") {
      return NextResponse.redirect(new URL("/creator", req.url));
    }
  } else {
    const isProtected =
      pathname.startsWith("/creator") || pathname.startsWith("/consumer");

    if (isProtected) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
