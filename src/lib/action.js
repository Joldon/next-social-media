"use server";
/**
 * Server-side actions for blog post management in a Next.js application.
 * Includes functionality to add and delete blog posts using form data.
 * - `addPost`: Asynchronously creates a new post with the provided form data (title, desc, slug, userId),
 *   saves it to the database, and triggers a revalidation of the "/blog" path to update cached content.
 * - `deletePost`: Asynchronously deletes a post by its ID, provided via form data, and revalidates the "/blog" path.
 * Utilizes the `next/cache` module for cache revalidation and a custom `connectToDb` utility for database operations.
 */

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (formData) => {
  //   const title = formData.get("title");
  //   const desc = formData.get("desc");
  //   const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);
  try {
    await connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async (previousState, formData) => {
  // previousState is parameter from useFormState
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }

    // return { error: "Something went wrong" };
    throw error; // re-throw the error because next-redirect intentionally throws an error
    // with the above commented line. So we need to re-throw the error to make it work. (SOLUTION)
    // here is the explanation https://nextjs.org/docs/app/api-reference/functions/redirect
  }
};
