import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import useAuth from "../../Firebase/Hooks/useAuth";
import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
    // importing login methods here
    const {
        error,
        loginUsingFacebook,
        loginUsingGithub,
        loginUsingEmail,
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
    // email/password login
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        loginUsingEmail(data.email, data.password, location, history);
    };
    return (
        <div className="login-page">
            <div className="auth-error">
                {error && (
                    <div className="alert alert-danger">
                        <h6> {error} </h6>
                    </div>
                )}
            </div>
            <div className="container">
                <h1 className="text-center login-title">Login Here</h1>
                <div className="login-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                minLength: 6,
                                required: true,
                            })}
                        />
                        <input
                            className="btn login-btn"
                            type="submit"
                            value="Log In"
                        />
                    </form>
                    <span>
                        Don't have an account?
                        <Link to="/register"> Create an account</Link>
                    </span>
                </div>
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

export default Login;
