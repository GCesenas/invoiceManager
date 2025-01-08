import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
