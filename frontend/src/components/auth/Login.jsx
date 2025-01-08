import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../api/auth";
import { useAuth } from "../../contexts/AuthProvider";
import setPageTitle from "../../utils/setPageTitle";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    useEffect(() => {
        setPageTitle("Inicio de sesión");
    }, []);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(formData);
            authLogin(response.data.user, response.data.token);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            Swal.fire({
                toast: true,
                icon: "error",
                title: "Credenciales inválidas. Intenta de nuevo.",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: "#f8d7da",
                color: "#721c24",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="flex justify-center">
                <div className="text-center">
                    <img
                        src="/assets/logo.svg"
                        alt="Logo"
                        className="h-16 w-64"
                    />
                    <h1 className="text-gray-700 font-semibold mt-0">Invoice Manager</h1>
                </div>
            </div>

            <div className="relative mt-0">
                <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <div className="mt-1 flex items-center border border-gray-300 rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500">
                    <span className="pl-3 text-gray-400">
                        <IoMail />
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1 py-2 px-3 border-none focus:outline-none"
                        placeholder="Ingresa tu correo electrónico"
                        required
                    />
                </div>
            </div>

            <div className="relative mt-4">
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <div className="mt-1 flex items-center border border-gray-300 rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500">
                    <span className="pl-3 text-gray-400">
                        <RiLockPasswordFill />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="flex-1 py-2 px-3 border-none focus:outline-none"
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                    <button
                        type="button"
                        className="pr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className={`w-full py-2 px-4 text-white rounded ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary"
                    }`}
                disabled={loading}
            >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            <p className="text-center">
                ¿No tienes una cuenta?
                <Link
                    to="/register"
                    className="mt-6 px-2 color-secondary"
                >
                    <span className="font-semibold">Regístrate</span>
                </Link>
            </p>
        </form>
    );
};

export default Login;
