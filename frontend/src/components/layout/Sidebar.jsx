import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFileInvoice } from "react-icons/fa"; 

const Sidebar = () => {
    return (
        <aside className="bg-gray-300 text-gray-800 w-64 h-screen p-4 flex flex-col">
            <div className="flex justify-center mb-6">
                <div className="text-center">
                    <img
                        src="/assets/logo.svg"
                        alt="Logo"
                        className="h-16 w-64"
                    />
                    <h1 className="text-gray-700 font-semibold mt-3">Menú</h1>
                    <hr className="border-gray-400 my-4" />
                </div>
            </div>

            <ul className="space-y-4">
                <li>
                    <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition-all duration-200"
                    >
                        <FaHome className="text-gray-700 hover:text-white transition-all duration-200" />
                        <span>Inicio</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/invoices"
                        className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition-all duration-200"
                    >
                        <FaFileInvoice className="text-gray-700 hover:text-white transition-all duration-200" />
                        <span>Facturas</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
