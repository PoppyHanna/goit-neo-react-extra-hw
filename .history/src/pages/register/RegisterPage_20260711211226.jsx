import RegistrationForm from "../../components/registration/RegistrationForm";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <div className={css.box}>
      <h2>Register</h2>
      <RegistrationForm />
    </div>
  );
}
