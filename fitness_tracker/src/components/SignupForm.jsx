import AuthForm from '../components/AuthForm';

export default function SignupForm() {
    return (
        <AuthForm endpoint="http://localhost:4001/user/signup" title="Sign Up To FiTrack!" buttonText="Sign Up!" redirectTitleText="Already have an account?" redirectLink="/login" redirectText="Log in here!" />
    );
}