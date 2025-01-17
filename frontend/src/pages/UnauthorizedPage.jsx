import React from "react";
import { Link } from "react-router-dom";
import { LuShieldAlert } from "react-icons/lu";

const UnauthorizedPage = () => {
    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: "calc(100vh - 120px)" }}
        >
            <LuShieldAlert className="h-28 w-28 mb-4" />
            <h1 className="text-3xl font-bold text-red-500 uppercase">Acceso denegado</h1>
            <p className="text-lg text-gray-700 mt-2">
                Lo sentimos, no tienes permisos para acceder a esta página.
            </p>
            <Link to="/" className="mt-4 bg-primary text-white px-4 py-2 rounded">
                Volver al inicio
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
