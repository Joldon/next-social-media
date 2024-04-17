import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await fetch(
    `http://localhost:3000/api/blog/${slug}`
    // if you want to delete a post, it should be delete method
    // , {method: "DELETE"}
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

/**
 * Generates metadata for a blog post based on the provided parameters.
 * @param {Object} params - The parameters for generating metadata.
 * @param {string} params.slug - The slug of the blog post.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the generated metadata.
 */
export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  // To fix the TypeError, I would add a null check before accessing the 'title' property of the 'post' object. BELOW
  if (!post) {
    return {
      title: "",
      description: "",
    };
  }
  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  // FETCH DATA WITH AN API
  const post = await getData(slug);

  // FETCH DATA WITHOUT AN API
  // const post = await getPost(slug);
  console.log(post);
  return (
    <div className={styles.container}>
      {post?.img && (
        <div className={styles.imgContainer}>
          <Image className={styles.img} src={post.img} alt="" fill />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>

        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>published</span>
            <span className={styles.detailValue}>
              {/* To fix the TypeError, added a null check before accessing the 'createdAt' property of the 'post' object. */}
              {post && post.createdAt && post.createdAt.toString().slice(0, 16)}

              {/* without null check */}
              {/* {post.createdAt.toString().slice(4, 16)} */}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
