import LoginForm from "../../components/login/LoginForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.box}>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}
