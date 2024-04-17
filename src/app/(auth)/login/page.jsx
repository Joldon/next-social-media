import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";
import styles from "./login.module.css";

const LoginPage = () => {
  // one way to conditionally render an admin page
  // auth?.user?.isAdmin && router.push("/") // this line: if user is an admin, redirect to the home page

  // but better solution is to use Next.js middleware because it can check if the user is an admin before rendering the page

  // async removed from here because the function does not fetch data
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
