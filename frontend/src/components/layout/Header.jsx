import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import Button from "../ui/Button";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
    const { user, logout } = useAuth();
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
        <header className="bg-primary text-white flex items-center justify-between px-6 py-4 shadow-lg">
            <h1 className="text-xl font-semibold">Invoice Manager</h1>

            <div
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
            >
                <div className="flex items-center space-x-2 cursor-pointer">
                    <FaUserCircle className="w-6 h-6" />
                    <span>Hola, {user?.name || "Usuario"}</span>
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
                            <Button
                                className="block font-semibold w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    logout();
                                }}
                                icon={<IoLogOut className="h-5 w-5" />}
                            >
                                Cerrar sesión
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
