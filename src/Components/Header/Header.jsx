import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import useAuth from "../../Firebase/Hooks/useAuth";

const Header = () => {
    const { user, logout, admin } = useAuth();

    return (
        <header>
            <div className="navigation container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <span className="navbar-brand">
                            <NavLink to="/">
                                <img
                                    className="logo"
                                    src="https://i.ibb.co/wrknQ0N/Group-4-1.png"
                                    alt="logo"
                                />
                            </NavLink>
                        </span>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item ">
                                    <span className="nav-link">
                                        <NavLink
                                            className="hover-link "
                                            to="/home"
                                        >
                                            Home
                                        </NavLink>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <NavLink
                                            className="hover-link"
                                            to="/about"
                                        >
                                            About
                                        </NavLink>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <NavLink
                                            className="hover-link"
                                            to="/shop"
                                        >
                                            Shop
                                        </NavLink>
                                    </span>
                                </li>
                                {admin && (
                                    <>
                                        <li className="nav-item">
                                            <span className="nav-link">
                                                <NavLink
                                                    className="hover-link"
                                                    to="/dashboard"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </span>
                                        </li>
                                    </>
                                )}
                                {user.email && !admin && (
                                    <>
                                        <li className="nav-item">
                                            <span className="nav-link">
                                                <NavLink
                                                    className="hover-link"
                                                    to="/userdashboard"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </span>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <NavLink
                                            className="hover-link"
                                            to="/contact"
                                        >
                                            Contacts
                                        </NavLink>
                                    </span>
                                </li>
                                {/* conditional rendering for auth links  */}
                                {/* before login user  */}
                                {!user?.email && (
                                    <li className="  nav-item">
                                        <NavLink to="/login">
                                            <button className="nav-link login-btn btn">
                                                Login
                                            </button>
                                        </NavLink>
                                    </li>
                                )}
                                {/* after login user  */}
                                {user?.email && (
                                    <li className="nav-item">
                                        <span className="nav-link user-name">
                                            {user?.displayName
                                                ? user?.displayName
                                                : "Anonymous"}
                                        </span>
                                    </li>
                                )}
                                {user?.email && (
                                    <li className="nav-item">
                                        <button
                                            onClick={logout}
                                            className="btn btn-danger logout-btn"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                )}
                                {/* conditional rendering for auth links  */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
