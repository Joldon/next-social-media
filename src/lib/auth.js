// This file is responsible for handling authentication using NextAuth and GitHub provider.
// It defines the authentication handlers, providers, and callbacks for signing in and signing out.

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models"; // imports the User model from the models file
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username }); // finds the user by their username
    // you can find the user in mongodb by their username and insert in form of credentials.username

    if (!user) {
      throw new Error("Wrong username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong username or password");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
};

export const {
  // below are the handlers for the authentication
  handlers: { GET, POST },
  // below are the default built-in functions for the authentication from NextAuth
  auth, // auth is the default built-in function for the authentication from NextAuth
  signIn, // signIn is the default built-in function for the authentication from NextAuth
  signOut,
} = NextAuth({
  // all the properties and values of authConfig are passed as individual arguments to the NextAuth function.
  // This allows the NextAuth function to receive the configuration options and use them for setting up the authentication functionality.
  // By spreading the properties of authConfig, we can access and use those properties individually without explicitly referencing the authConfig object.
  ...authConfig,
  providers: [
    // providers are the authentication providers that NextAuth uses to authenticate the user
    GitHub({
      clientId: process.env.GITHUB_ID, // GITHUB_ID is the client ID from the GitHub OAuth app
      clientSecret: process.env.GITHUB_SECRET, // GITHUB_SECRET is the client secret from the GitHub OAuth app
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // callbacks are the functions that are called when the user signs in or signs out

    // The signIn callback is used to connect to the database, find or create a user based on their GitHub profile
    async signIn({ user, account, profile }) {
      console.log(profile); // profile is the user's profile information from the authentication provider
      // I used console.log(profile) to see the user's profile information from the authentication provider

      // The signIn callback is used to connect to the database, find or create a user based on their GitHub profile
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          // and save the user's information if they don't exist in the database.
          if (!user) {
            const newUser = new User({
              // the keys are the fields in the User model
              username: profile.login, // login is the GitHub username. It can be seen from console.log(profile)
              email: profile.email,
              image: profile.avatar_url, // avatar_url is the GitHub profile picture
            });
            await newUser.save(); // saves the user to the database
          }
        } catch (error) {
          console.log(error);
          return false; // returns false if there is an error
        }
      }
      return true; // returns true if the user is successfully signed in
    },
    // This line of code is accessing the callbacks property of an authConfig object.
    // It is using the spread operator (...) to include all the properties of authConfig.callbacks in the current context.
    ...authConfig.callbacks,
  },
});
