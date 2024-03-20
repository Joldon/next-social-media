/**
 * API ROUTES
 * This code defines the GET request handler for the blog route.
 * It imports the necessary modules and models, connects to the database,
 * retrieves all the posts from the database using the Post model,
 * and returns the posts as a JSON response using NextResponse.
 */
import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};
