import LoginForm from "../components/LoginForm";
import styles from "../module_CSS/AuthPage.module.css";

export default function Login() {
    return (
        <div className={styles.background}>
            <LoginForm />
        </div>
    );
}