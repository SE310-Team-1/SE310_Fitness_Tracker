import AuthForm from './AuthForm';

export default function LoginForm() {
    return (
        <AuthForm endpoint="http://localhost:4001/user/login" title="Log Into FiTrack!" buttonText="Login!" redirectTitleText="Don't have an account?" redirectLink="/signup" redirectText="Sign up here!" />
    );
}