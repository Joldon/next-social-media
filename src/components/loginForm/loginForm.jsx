"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import styles from "./loginForm.module.css";
import { login } from "@/lib/action";

const LoginForm = () => {
  const [state, FormAction] = useFormState(login, undefined);
  const router = useRouter();
  return (
    <form className={styles.form} action={FormAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error}
      <Link href="/register">
        {"Don't have an account?"}
        <br />
        <b>Register</b>
      </Link>
    </form>
  );
};
export default LoginForm;
