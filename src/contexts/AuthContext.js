import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginAdmin } from '../api/admin';
import { jwtDecode } from "jwt-decode";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to consume the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
    // State to track authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Function to log in user
    const login = async (adminData) => {
        try {
            const response = await loginAdmin(adminData);
            const token = response.token;
            localStorage.setItem('token', token);
            setToken(token); // Set the token in the state
            setIsAuthenticated(true);
            setIsAuthenticated(true);
            setUser(response.user); // Set user information
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    // Function to log out user
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        window.location.reload();
        // Clear user information
    };
    // Function to check if user is authenticated
    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        const authenticated = !!token;
        setIsAuthenticated(authenticated);
        return authenticated;
    };

    // Function to check if token is expired
    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };
    // Function to logout if token is expired
    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            logout();
        }
    };

    // Use useEffect to check token expiration periodically
    useEffect(() => {
        // Check token expiration every 5 minutes (adjust as needed)
        const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Value object to provide to consuming components
    const value = {
        isAuthenticated,
        token, // Include token in the context value
        user,
        login,
        logout,
        checkAuth,
    };

    // Check authentication status when component mounts
    useEffect(() => {
        checkAuth();
    }, []);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
