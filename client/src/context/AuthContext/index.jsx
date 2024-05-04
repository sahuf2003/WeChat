import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../service/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe(); // Unsubscribe from auth state changes when component unmounts
    }, []);
    
    async function initializeUser(user) {
        if (user) {
            setCurrentUser(user);
            setIsEmailUser(user.providerData.some(provider => provider.providerId === "password"));
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setIsEmailUser(false);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {
        userLoggedIn,
        isEmailUser,
        currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
