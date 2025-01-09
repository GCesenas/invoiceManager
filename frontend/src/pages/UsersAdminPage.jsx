import React, { useEffect, useState } from "react";
import setPageTitle from "../utils/setPageTitle";
import api from "../api/axios";
import { FaTrash } from "react-icons/fa";
import { IoMail, IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import Swal from "sweetalert2";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "../contexts/AuthProvider";

const UsersAdminPage = () => {
    useEffect(() => {
        setPageTitle("Gestión de usuarios");
    }, []);

    const { refreshUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        permissions: [],
        errors: {},
    });
    const [newPermission, setNewPermission] = useState({
        name: "",
        errors: {},
    });
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isCreatingPermission, setIsCreatingPermission] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await api.get("/api/admin/users");
                const permissionsRes = await api.get("/api/admin/permissions");
                setUsers(usersRes.data);
                setPermissions(
                    permissionsRes.data.map((permission) => ({
                        value: permission.name,
                        label: permission.name,
                    }))
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            await api.post("/api/admin/users", {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                permissions: newUser.permissions.map((p) => p.value),
            });
            const usersRes = await api.get("/api/admin/users");
            setUsers(usersRes.data);
            setNewUser({
                name: "",
                email: "",
                password: "",
                permissions: [],
                errors: {},
            });

            Swal.fire({
                icon: "success",
                title: "Usuario creado",
                text: "El usuario se ha creado correctamente.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setNewUser({ ...newUser, errors: error.response.data.errors });
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear el usuario. Revisa los datos e intenta nuevamente.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
        } finally {
            setIsCreating(false);
        }
    };

    const handleCreatePermission = async (e) => {
        e.preventDefault();
        setIsCreatingPermission(true);
        try {
            await api.post("/api/admin/permissions", { name: newPermission.name });
            const permissionsRes = await api.get("/api/admin/permissions");
            setPermissions(
                permissionsRes.data.map((permission) => ({
                    value: permission.name,
                    label: permission.name,
                }))
            );
            setNewPermission({
                name: "",
                errors: {},
            });

            Swal.fire({
                icon: "success",
                title: "Permiso creado",
                text: "El permiso se ha creado correctamente.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setNewPermission({ ...newPermission, errors: error.response.data.errors });
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear el permiso. Revisa los datos e intenta nuevamente.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
        } finally {
            setIsCreatingPermission(false);
        }
    };

    const handleAssignPermissions = async (userId, selectedPermissions) => {
        const permissions = selectedPermissions.map((p) => p.value);
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto actualizará los permisos del usuario.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, continuar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#002539",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.post(`/api/admin/users/${userId}/permissions`, { permissions });
                    const usersRes = await api.get("/api/admin/users");
                    setUsers(usersRes.data);

                    Swal.fire({
                        icon: "success",
                        title: "Permisos actualizados",
                        text: "Los permisos se actualizaron correctamente.",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#002539",
                    });

                    refreshUser();
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudieron actualizar los permisos. Intenta nuevamente.",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#002539",
                    });
                }
            }
        });
    };

    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará al usuario de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#002539",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/api/admin/users/${userId}`);
                    const usersRes = await api.get("/api/admin/users");
                    setUsers(usersRes.data);

                    Swal.fire({
                        icon: "success",
                        title: "Usuario eliminado",
                        text: "El usuario ha sido eliminado correctamente.",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#002539",
                    });
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo eliminar al usuario. Intenta nuevamente.",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#002539",
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center" style={{ height: "calc(100vh - 120px)" }}>
                <ImSpinner2 className="animate-spin h-6 w-6 me-2" />
                <div className="text-lg text-gray-600">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-white p-6 rounded shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Crear Usuario</h2>
                <form onSubmit={handleCreateUser}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <div className={`mt-1 flex items-center border ${newUser.errors.name ? "border-red-500" : "border-gray-300"} rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500`}>
                                <span className="pl-3 text-gray-400">
                                    <IoPerson />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Ingresa el nombre"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="flex-1 py-2 px-3 border-none focus:outline-none"
                                />
                            </div>
                            {newUser.errors.name && <p className="text-red-500 text-sm">{newUser.errors.name[0]}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <div className={`mt-1 flex items-center border ${newUser.errors.email ? "border-red-500" : "border-gray-300"} rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500`}>
                                <span className="pl-3 text-gray-400">
                                    <IoMail />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Ingresa el correo electrónico"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="flex-1 py-2 px-3 border-none focus:outline-none"
                                />
                            </div>
                            {newUser.errors.email && <p className="text-red-500 text-sm">{newUser.errors.email[0]}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <div className={`mt-1 flex items-center border ${newUser.errors.password ? "border-red-500" : "border-gray-300"} rounded shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500`}>
                                <span className="pl-3 text-gray-400">
                                    <RiLockPasswordFill />
                                </span>
                                <input
                                    type="password"
                                    placeholder="Ingresa la contraseña"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="flex-1 py-2 px-3 border-none focus:outline-none"
                                />
                            </div>
                            {newUser.errors.password && <p className="text-red-500 text-sm">{newUser.errors.password[0]}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Permisos</label>
                            <Select
                                isMulti
                                options={permissions}
                                value={newUser.permissions}
                                onChange={(selected) => setNewUser({ ...newUser, permissions: selected })}
                                className="w-full"
                                placeholder="Selecciona permisos..."
                                noOptionsMessage={() => "Sin opciones disponibles"}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded flex items-center justify-center"
                            disabled={isCreating}
                        >
                            {isCreating ? (
                                <ImSpinner2 className="animate-spin h-6 w-6" />
                            ) : (
                                "Crear Usuario"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Crear Permiso</h2>
                <form onSubmit={handleCreatePermission}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Permiso</label>
                        <input
                            type="text"
                            value={newPermission.name}
                            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                            placeholder="Nombre del permiso"
                            className={`w-full border ${newPermission.errors.name ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {newPermission.errors.name && <p className="text-red-500 text-sm">{newPermission.errors.name[0]}</p>}
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded"
                            disabled={isCreatingPermission}
                        >
                            {isCreatingPermission ? (
                                <ImSpinner2 className="animate-spin h-6 w-6" />
                            ) : (
                                "Crear Permiso"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Usuarios</h2>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Nombre</th>
                            <th className="border px-4 py-2">Correo electrónico</th>
                            <th className="border px-4 py-2">Permisos</th>
                            <th className="border px-4 py-2">Gestionar usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    {user.permissions.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {user.permissions.map((permission) => (
                                                <span
                                                    key={permission.id}
                                                    className="text-sm bg-secondary text-white font-semibold rounded px-2 py-1"
                                                >
                                                    {permission.name}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-500 italic">Sin permisos</span>
                                    )}
                                </td>
                                <td className="border px-4 py-2 flex items-center space-x-2">
                                    <Select
                                        isMulti
                                        options={permissions}
                                        value={user.permissions.map((p) => ({
                                            value: p.name,
                                            label: p.name,
                                        }))}
                                        onChange={(selected) => handleAssignPermissions(user.id, selected)}
                                        className="w-full"
                                        placeholder="Selecciona permisos..."
                                        noOptionsMessage={() => "Sin opciones disponibles"}
                                    />
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 text-white rounded p-2 hover:bg-red-600 focus:outline-none"
                                        title="Eliminar usuario"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersAdminPage;
