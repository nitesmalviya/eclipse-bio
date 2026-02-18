import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_PATH, PUBLIC_PATH } from "./utils/constant";
import {
  checkTokenExpired,
  handleTokenExpiration,
  isProtectedRoute,
  redirectToLogin,
} from "./utils/proxy-services";

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const PUBLIC_ROUTES = Object.values(PUBLIC_PATH);
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("access_token")?.value;

  // Check if the current path is a public route
  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  // If no token exists
  if (!token) {
    // Allow access to public routes
    if (isPublicRoute) {
      return NextResponse.next();
    }
    // Redirect to login for protected routes
    if (isProtectedRoute(path)) {
      return NextResponse.redirect(new URL(PUBLIC_PATH.LOGIN, request.url));
    }

    // Allow access to other routes (like static files, etc.)
    return NextResponse.next();
  }

  // Token exists - validate it
  try {
    const isTokenExpired = checkTokenExpired(token);
    if (isTokenExpired) {
      // Try to refresh the token
      return await handleTokenExpiration(request);
    }
    // Token is valid
    // If user is trying to access public routes (login/signup), redirect to home
    if (isPublicRoute) {
      return NextResponse.redirect(
        new URL(PRIVATE_PATH.ECOMPASS_HOME, request.url),
      );
    }
    // Allow access to protected routes
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // If there's an error validating the token
    // Allow access to public routes
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Redirect to login for protected routes
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/signup/verify",
    "/sign-in",
    "/forgot-password/:path*",
    "/home",
    "/account-settings/:path*",
    "/emerge/:path*",
    "/everse/:path*",
    "/rna-library/:path*",

    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
