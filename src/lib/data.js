import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

// const posts = [
//   { id: 1, title: "Post 1", body: "This is the first post", userId: 1 },
//   { id: 2, title: "Post 2", body: "This is the second post", userId: 2 },
//   { id: 3, title: "Post 3", body: "This is the third post", userId: 1 },
//   { id: 4, title: "Post 4", body: "This is the fourth post", userId: 2 },
// ];

export const getPosts = async () => {
  // I DELETED LINES THAT WERE USED WITH THE TEMPORARY DATA.
  // FOR SIMILAR EXAMPLE SEE THE getPost FUNCTION
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPost = async (slug) => {
  // THIS WAS USED WITH THE TEMPORARY DATA
  // export const getPost = async (id) => {
  // const post = posts.find((post) => post.id === parseInt(id));
  // return post;
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
};

export const getUser = async (id) => {
  noStore();
  // THIS WAS USED WITH THE TEMPORARY DATA
  // return users.find((user) => user.id === parseInt(id));

  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};
