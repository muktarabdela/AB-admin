import React from "react";
import ReactDOM from "react-dom";

import './index.css'
import App from "./App"
import { ContextProvider } from './contexts/ContextProvider'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <AuthProvider>
        <ContextProvider >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProvider>
    </AuthProvider>
    , document.getElementById("root"))