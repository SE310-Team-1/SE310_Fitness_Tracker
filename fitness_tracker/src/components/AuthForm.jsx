import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

// This component is a reusable form that can be used for both the login and signup pages. This was done to reduce code duplication.
export default function AuthForm({ endpoint, title, buttonText, redirectTitleText, redirectLink, redirectText }) {
    const labelStyle = "text-2xl";
    const inputStyle = "border-2 w-64 h-8 p-2 rounded-lg mb-4 mt-2 border-primary focus:border-primary-highlight focus:outline-none";

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
        <form className="flex flex-col border-2 items-center border-primary-dark w-80 p-4 rounded-xl bg-blue-100">
            <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
            <div className="flex flex-col">
                <label className={labelStyle} htmlFor="username">Username</label>
                <input className={inputStyle} required type="username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
            </div>
            <div className="flex flex-col">
                <label className={labelStyle} htmlFor="password">Password</label>
                <input className={inputStyle} required type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <button className="w-60 bg-primary text-white text-button p-2 rounded-lg mt-4" onClick={(e) => handleSubmit(e)}>{buttonText}</button>
            <p className="text-xl mt-4">{redirectTitleText}</p>
            <Link to={redirectLink} className="text-primary-highlight text-xl">{redirectText}</Link>
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
