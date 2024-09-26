import SignupForm from "../components/SignupForm";
import styles from "../module_CSS/AuthPage.module.css";

export default function Login() {
    return (
        <div className={styles.background}>
            <SignupForm />
        </div>
    );
}