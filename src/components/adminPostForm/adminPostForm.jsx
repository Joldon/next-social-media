"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";

const AdminPostForm = ({ userId }) => {
  const [state, forAction] = useFormState(addPost, undefined);
  return (
    <form className={styles.container}>
      <h1>Add new post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea type="text" name="desc" placeholder="description" rows={10} />
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;