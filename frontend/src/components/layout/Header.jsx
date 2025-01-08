import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown, FaUserCircle, FaUsers } from "react-icons/fa";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeTimeout = useRef(null);

    const openMenu = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        closeTimeout.current = setTimeout(() => {
            setIsMenuOpen(false);
        }, 200);
    };

    return (
        <header className="header text-white flex items-center justify-between px-4 lg:px-6 py-4 shadow-lg">
            <div className="flex items-center space-x-3 lg:hidden">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-white text-2xl focus:outline-none"
                >
                    <FaBars />
                </button>
                <h1 className="text-lg font-semibold lg:hidden">Invoice Manager</h1>
            </div>

            <h1 className="hidden lg:block text-xl font-semibold">Invoice Manager</h1>

            <div className="flex items-center space-x-4 lg:space-x-6">
                {user?.permissions?.some((permission) => permission.name === "manage-users") && (
                    <button
                        onClick={() => navigate("/admin")}
                        className="flex items-center justify-center bg-secondary text-white text-sm lg:text-xs lg:font-semibold px-3 py-1 lg:px-2 lg:py-2 rounded space-x-2 lg:space-x-0"
                    >
                        <FaUsers className="w-4 h-4 lg:w-4 lg:h-4 lg:me-2" />
                        <span className="hidden lg:inline">Administrar usuarios</span>
                    </button>
                )}

                <div
                    className="relative"
                    onMouseEnter={openMenu}
                    onMouseLeave={closeMenu}
                >
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <FaUserCircle className="w-6 h-6" />
                        <span className="hidden lg:block">Hola, {user?.name}</span>
                        <FaChevronDown
                            className={`transition-transform duration-200 h-3 w-3 ${
                                isMenuOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </div>
                    <div
                        className={`absolute right-0 mt-2 bg-white text-gray-700 rounded shadow-lg w-48 transform transition-all duration-200 ${
                            isMenuOpen
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                        }`}
                        onMouseEnter={openMenu}
                        onMouseLeave={closeMenu}
                    >
                        <ul className="py-2">
                            <li>
                                <button
                                    className="block font-semibold w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        logout();
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
