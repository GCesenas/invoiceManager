import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileInvoice, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={closeSidebar}
            ></div>

            <aside
                className={`fixed top-0 left-0 bg-gray-300 text-gray-800 w-64 h-screen p-4 flex flex-col justify-between z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } lg:static lg:translate-x-0`}
            >
                <div>
                    <div className="flex justify-center mb-6">
                        <div>
                            <Link to="/dashboard">
                                <img src="/assets/logo.svg" alt="Logo" className="h-16 w-64" />
                            </Link>
                            <h1 className="text-gray-700 font-semibold mt-3">Menú</h1>
                            <hr className="border-gray-400 mt-2 mb-0" />
                        </div>
                    </div>
                    
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/dashboard"
                                className={`group flex items-center space-x-3 py-2 px-2 rounded transition-all duration-200 ${isActive("/dashboard")
                                        ? "bg-secondary text-white"
                                        : "sidebar-link hover:text-white"
                                    }`}
                                onClick={closeSidebar}
                            >
                                <FaHome
                                    className={`w-5 h-5 ${isActive("/dashboard")
                                            ? "text-white"
                                            : "text-gray-700 group-hover:text-white"
                                        }`}
                                />
                                <span>Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/invoices"
                                className={`group flex items-center space-x-3 py-2 px-2 rounded transition-all duration-200 ${isActive("/invoices")
                                        ? "bg-secondary text-white"
                                        : "sidebar-link hover:text-white"
                                    }`}
                                onClick={closeSidebar}
                            >
                                <FaFileInvoice
                                    className={`w-5 h-5 ${isActive("/invoices")
                                            ? "text-white"
                                            : "text-gray-700 group-hover:text-white"
                                        }`}
                                />
                                <span>Facturas</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <hr className="border-gray-400 mb-1" />
                    <button
                        onClick={() => {
                            logout();
                            closeSidebar();
                        }}
                        className="group flex items-center space-x-3 py-2 px-2 rounded hover:bg-red-600 hover:text-white transition-all duration-200 w-full"
                    >
                        <FaSignOutAlt className="w-5 h-5 text-gray-700 group-hover:text-white" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
