import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import styles from "../module_CSS/AuthForm.module.css"

// This component is a reusable form that can be used for both the login and signup pages. This was done to reduce code duplication.
export default function AuthForm({ endpoint, title, buttonText, redirectTitleText, redirectLink, redirectText }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting form with data:", { username, password });
        axios.post(endpoint, {
            username: username,
            password: password
        }, {
            withCredentials: true
        }).then(response => {
            console.log("response is:", response);
            if (response.data.success || response.status === 200 || response.status === 201) {
                console.log("Successfully logged in or signed up!");
                window.location.href = "/dashboard";
            } else {
                alert("Invalid username or password!");
            }
        }).catch(error => {
            if (error.response.status === 409) {
                alert("User already exists!");
            } if (error.response.status === 401) {
                alert("Invalid username or password!");
            }else {
                console.log("An error occurred while trying to log in or sign up.");
                console.log(error);
            }
        });
    }

    return (
        <form className={styles.form}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.inputdiv}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input className={styles.input} required type="username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
            </div>
            <div className={styles.inputdiv}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} required type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <button className={styles.button} onClick={(e) => handleSubmit(e)}>{buttonText}</button>
            <p>{redirectTitleText}</p>
            <Link to={redirectLink} className={styles.link}>{redirectText}</Link>
        </form>
    );
}

// Define prop types for the AuthForm component
AuthForm.propTypes = {
    endpoint: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    redirectTitleText: PropTypes.string.isRequired,
    redirectLink: PropTypes.string.isRequired,
    redirectText: PropTypes.string.isRequired,
};
