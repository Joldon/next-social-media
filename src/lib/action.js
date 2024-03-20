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
import { Post } from "./models";
import { connectToDb } from "./utils";

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
