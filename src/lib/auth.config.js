/**
 * This file contains the configuration for authentication in the application.
 * It defines the behavior of the authentication system, including the sign-in page,
 * providers, token handling, session handling, and authorization rules.
 */

export const authConfig = {
  pages: {
    signIn: "/login", // changes the default sign-in page to /login, if the user is not authenticated
  },
  providers: [], // array is empty because providers are already defined in the auth.js file
  callbacks: {
    async jwt({ token, user }) {
      // Updates the token with user information if the user is authenticated
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token; // returns the updated token
    },
    async session({ session, token }) {
      // Updates the session with user information if the token is present
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      // Determines whether a user is authorized to access a specific page or resource
      const user = auth?.user; // checks if the user is authenticated
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin"); // checks if the user is on the admin panel
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog"); // checks if the user is on the blog page
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login"); // checks if the user is on the login page

      // Only Admin can access the admin panel
      if (isOnAdminPanel && !user?.isAdmin) {
        return false; // this false redirects to the login page
      }
      // Only authenticated users can access the blog page
      if (isOnBlogPage && !user) {
        return false; // this false redirects to the login page
      }

      // Only unauthenticated users can access the login page
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl)); // this false redirects to the home page
      }
      return true; // returns true if none of the conditions are met
    },
  },
};
