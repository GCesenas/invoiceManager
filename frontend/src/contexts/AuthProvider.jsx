import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (token) {
                const response = await getUser();
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error refrescando usuario:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            await refreshUser();
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("auth_token", token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_token");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
