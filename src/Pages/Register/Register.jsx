import React from "react";
import './Register.css'
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../Firebase/Hooks/useAuth";

const Register = () => {
    const {
        error,
        loginUsingFacebook,
        loginUsingGithub,
        createUser,
        loginUsingGoogle,
    } = useAuth();
    // location information
    const location = useLocation();
    const history = useHistory();
    // github login
    const handleGithubLogin = () => {
        loginUsingGithub(location, history);
    };
    // google login
    const handleGoogleLogin = () => {
        loginUsingGoogle(location, history);
    };
    // facebook login
    const handleFacebookLogin = () => {
        loginUsingFacebook(location, history);
    };
    // email/password registration
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        createUser(data.email, data.password, data.name, location, history);
    };

    return (
        <div className="register-page">
            <div className="auth-error">
                {error && (
                    <div className="alert alert-danger">
                        <h6>{error}</h6>
                    </div>
                )}
            </div>
            <div className="register-form container">
                <h1>Register Here</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Image Link"
                        {...register("image")}
                    />
                    <input
                        className="btn btn-register"
                        type="submit"
                        value="Register"
                    />
                </form>
                <span>
                    Already have an account? <Link to="/login">Login here</Link>
                </span>
            </div>
            <div className="container">
                <h5 className="text-center pt-5">
                    ------------ or ------------
                </h5>
                <div className="social-login-area">
                    <h1>Continue with Social Login</h1>
                    <button
                        className="btn btn-google shadow"
                        onClick={handleGoogleLogin}
                    >
                        <img src="https://i.ibb.co/DrxpwZZ/google.png" alt="" />
                        Google SignIn
                    </button>
                    <button
                        className="btn btn-facebook  shadow"
                        onClick={handleFacebookLogin}
                    >
                        <img src="https://i.ibb.co/y0F9JDD/fb.png" alt="" />
                        Facebook SignIn
                    </button>
                    <button
                        className="btn  btn-github  shadow"
                        onClick={handleGithubLogin}
                    >
                        <img src="https://i.ibb.co/G9646vx/git.png" alt="" />
                        Github SignIn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
