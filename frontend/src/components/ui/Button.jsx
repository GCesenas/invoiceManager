import React from "react";

const Button = ({ children, icon, className, ...props }) => {
    return (
        <button
            {...props}
            className={`flex items-center space-x-2 py-2 px-4 rounded text-sm ${className}`}
        >
            {icon && <span className="text-gray-500">{icon}</span>}
            <span>{children}</span> 
        </button>
    );
};

export default Button;
