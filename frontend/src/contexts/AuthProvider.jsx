import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("auth_token");
                if (token) {
                    const response = await getUser();
                    setUser(response.data); 
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("auth_token", token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
