// This file is a route handler for handling HTTP requests related to posts.
// It contains two route handlers: GET and DELETE.

import { Post } from "@/lib/models"; // Importing the Post model from the "@/lib/models" module.
import { connectToDb } from "@/lib/utils"; // Importing the connectToDb function from the "@/lib/utils" module.
import { NextResponse } from "next/server"; // Importing the NextResponse object from the "next/server" module.

// The GET route handler for fetching a post.
export const GET = async (request, { params }) => {
  const { slug } = params; // Extracting the "slug" parameter from the request parameters.

  try {
    connectToDb(); // Connecting to the database.

    const post = await Post.findOne({ slug }); // Finding a post in the database based on the provided slug.
    return NextResponse.json(post); // Returning the post as a JSON response.
  } catch (error) {
    console.log(error); // Logging any errors that occur during the process.
    throw new Error("Failed to fetch post"); // Throwing an error indicating the failure to fetch the post.
  }
};

// The DELETE route handler for deleting a post.
export const DELETE = async (request, { params }) => {
  const { slug } = params; // Extracting the "slug" parameter from the request parameters.
  try {
    connectToDb(); // Connecting to the database.
    await Post.deleteOne({ slug }); // Deleting a post from the database based on the provided slug.
    return NextResponse.json({ message: "Post deleted" }); // Returning a JSON response indicating the successful deletion of the post.
  } catch (error) {
    console.log(error); // Logging any errors that occur during the process.
    throw new Error("Failed to delete post"); // Throwing an error indicating the failure to delete the post.
  }
};
