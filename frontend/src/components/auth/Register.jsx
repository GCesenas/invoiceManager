import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { register } from "../../api/auth";
import { IoMail, IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import setPageTitle from "../../utils/setPageTitle";

const Register = () => {
    useEffect(() => {
        setPageTitle("Registro");
    }, []);

    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await api.get("/sanctum/csrf-cookie"); 
            const response = await register(formData); 
            console.log("User registered:", response.data);

            Swal.fire({
                icon: "success",
                title: "¡Registro exitoso! Ahora puedes iniciar sesión.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

            navigate("/");
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al registrar. Intenta nuevamente.",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
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

            <h1 className="font-semibold text-center text-gray-700">Por favor, llena el formulario de registro</h1>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <div className={`mt-1 flex items-center border rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}>
                    <span className="pl-3 text-gray-400">
                        <IoPerson />
                    </span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-1 py-2 px-3 border-none focus:outline-none"
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <div className={`mt-1 flex items-center border rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}>
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <div className={`mt-1 flex items-center border rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}>
                    <span className="pl-3 text-gray-400">
                        <RiLockPasswordFill />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="flex-1 py-2 px-3 border-none focus:outline-none"
                        placeholder="Ingresa una contraseña"
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
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <div className={`mt-1 flex items-center border rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500 ${errors.password_confirmation ? "border-red-500" : "border-gray-300"}`}>
                    <span className="pl-3 text-gray-400">
                        <RiLockPasswordFill />
                    </span>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="flex-1 py-2 px-3 border-none focus:outline-none"
                        placeholder="Confirma tu contraseña"
                        required
                    />
                    <button
                        type="button"
                        className="pr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
                {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
            </div>

            <button
                type="submit"
                className={`w-full py-2 px-4 text-white rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
                disabled={loading}
            >
                {loading ? "Registrando..." : "Regístrate"}
            </button>

            <p className="text-center">
                ¿Ya tienes una cuenta?
                <Link
                    to="/"
                    className="px-2 color-secondary"
                >
                    <span className="font-semibold">Inicia sesión</span>
                </Link>
            </p>
        </form>
    );
};

export default Register;
