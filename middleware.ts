import { NextRequest, NextResponse } from "next/server";
import { getDecryptedCookies, isAuthRoute } from "./utils/auth";

export default async function middleware(req: NextRequest) {
  const authRoutes = ["/dashboard"];
  const authRoutesAdmin = ["/admin", "/admin/*"];
  const authRoutesUser = ["/"];

  
  const redirectUrl = new URL("/", req.nextUrl.origin);
  
  // Get decrypted cookies
  const { token, user } =
    getDecryptedCookies();
 


      const isAuth = isAuthRoute(req.nextUrl.pathname, authRoutes);
      const isAdmin = isAuthRoute(req.nextUrl.pathname, authRoutesAdmin);
      const isUser = isAuthRoute(req.nextUrl.pathname, authRoutesUser);

  // redirect unaythed users trying to access authenticated routes
  if (!token && isAuth) {
    return NextResponse.redirect(redirectUrl);
  }

  if (token) {
    // redirect admins trying to access user-specific routes
    if (user.role === "admin" && isUser) {
      return NextResponse.redirect(redirectUrl);
    }

    // rdirect users trying to access admin-specific routes
    if (user.role === "user" && isAdmin) {
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};