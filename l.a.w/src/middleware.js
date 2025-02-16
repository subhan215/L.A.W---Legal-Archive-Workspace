import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    let token = request.cookies.get("token")?.value || 
                request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Trim any extra spaces
    token = token.trim();

    try {
      console.log("Middleware token:", `"${token}"`);

      // Use jose for JWT verification
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret); // Async verification

      return NextResponse.next();
    } catch (error) {
      console.error("JWT Verification Failed:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard routes
};
