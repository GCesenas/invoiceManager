import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-red-500">Acceso no autorizado</h1>
            <p className="mt-4 text-gray-700">Por favor, inicia sesión para continuar.</p>
            <Link
                to="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Volver al inicio de sesión
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
