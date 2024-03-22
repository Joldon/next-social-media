import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;
// Exporting a configuration object with a matcher property
// The matcher property is a regular expression that matches all routes
// except those starting with "api", "static", files with extensions, or "_next"
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// This file serves as a middleware for authentication in a Next.js application using NextAuth.
// It imports the NextAuth library and the authConfig from the auth.config file.
// The NextAuth function is called with the authConfig as an argument, and the resulting authentication middleware function is exported as the default export.
// Additionally, a configuration object is exported with a matcher property, which is a regular expression that matches all routes except certain patterns.
// This configuration is used to define which routes should be authenticated and which should be excluded from authentication.
// The regular expression in the matcher property excludes routes starting with "api", "static", files with extensions, or "_next".
// This ensures that only specific routes are authenticated, while excluding routes like API endpoints, static files, and Next.js internal routes.
