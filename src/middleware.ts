// middleware.ts
import { auth } from "./server/auth";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/pricing", // Add pricing as public route
    "/api/stripe/webhooks", // Allow webhook access
    "/api/stripe/checkout", // Allow checkout API access
  ];

  // Check if current path is public or API route
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes("/favicon.ico");

  // Allow access to public routes
  if (isPublicRoute) {
    return;
  }

  // Redirect to login if not authenticated and accessing protected route
  if (!isAuthenticated) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Live detection route is now protected by default
  // No special handling needed as it will be caught by the general auth check
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
