import { useEffect, useState } from "react";
import initializeAuth from "../Auth/firebase.init";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

//initializing firebase here
initializeAuth();

const useFirebase = () => {
    // states we need
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [saveDetails, setSaveDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    // auth for firebase
    const auth = getAuth();

    // providers for different login methods
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // login functions here
    //google login
    const loginUsingGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
                saveUser(result.user.email, result.user.displayName, "PUT");
                const redirect_uri = location?.state?.from || "/";
                history.push(redirect_uri);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    //facebook login
    const loginUsingFacebook = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                setUser(result.user);
                const redirect_uri = location?.state?.from || "/";
                history.push(redirect_uri);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    //github login
    const loginUsingGithub = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                setUser(result.user);
                const redirect_uri = location?.state?.from || "/";
                history.push(redirect_uri);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    // create user with email/pass
    const createUser = (email, password, name, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // console.log(result);
                const updateProfileData = () => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                    }).then((res) => {});
                };
                setUser(result.user);
                saveUser(email, name, "POST");
                updateProfileData();
                const redirect_uri = location?.state?.from || "/";
                history.push(redirect_uri);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    // email/pass login
    const loginUsingEmail = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // console.log(result);

                setUser(result.user);
                const redirect_uri = location?.state?.from || "/";
                history.push(redirect_uri);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    //observer function here
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);
    // log out function here
    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser("");
            })
            .finally(() => setIsLoading(false));
    };
    // checking admin
    useEffect(() => {
        fetch(`https://serene-shelf-88269.herokuapp.com/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => setAdmin(data.admin));
    }, [user.email]);
    // save users to my database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch("https://serene-shelf-88269.herokuapp.com/users", {
            method: method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then();
    };

    // all my return value here
    return {
        user,
        admin,
        logout,
        error,
        loginUsingGoogle,
        loginUsingFacebook,
        loginUsingGithub,
        loginUsingEmail,
        setSaveDetails,
        saveDetails,
        isLoading,
        createUser,
        setIsLoading,
    };
};

export default useFirebase;
