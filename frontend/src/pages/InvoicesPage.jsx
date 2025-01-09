import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import setPageTitle from "../utils/setPageTitle";
import api from "../api/axios";
import Swal from "sweetalert2";
import { ImSpinner2 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";

const InvoicesPage = () => {
    useEffect(() => {
        setPageTitle("Gestión de facturas");
    }, []);

    const { user, refreshUser } = useAuth();

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const fileInputRef = useRef(null);
    const [invoices, setInvoices] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/admin/invoices");
                setInvoices(res.data);
            } catch (error) {
                console.error("Error al obtener facturas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            Swal.fire({
                icon: "error",
                title: "Archivo requerido",
                text: "Por favor selecciona un archivo XML.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
            return;
        }

        const formData = new FormData();
        formData.append("xml", file);

        setUploading(true);
        try {
            const res = await api.post("/api/admin/invoices", formData);

            const newInvoice = {
                ...res.data.invoice,
                uuid: res.data.invoice.uuid[0] || res.data.invoice.uuid,
                transmitter: res.data.invoice.transmitter[0] || res.data.invoice.transmitter,
                receiver: res.data.invoice.receiver[0] || res.data.invoice.receiver,
            };

            setInvoices([...invoices, newInvoice]);

            Swal.fire({
                icon: "success",
                title: "Factura cargada",
                text: res.data.message,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al cargar la factura",
                text: error.response?.data?.message || "Ocurrió un error inesperado.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#002539",
            });
        } finally {
            setUploading(false);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleDeleteInvoice = async (invoiceId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la factura de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#002539",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/api/admin/invoices/${invoiceId}`);
                    setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
                    Swal.fire({
                        icon: "success",
                        title: "Factura eliminada",
                        text: "La factura ha sido eliminada correctamente.",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#002539",
                    });
                } catch (error) {
                    console.error("Error eliminando factura:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo eliminar la factura. Intenta nuevamente.",
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
            {user?.permissions?.some((permission) => permission.name === "upload-invoices") && (
                <div className="bg-white p-6 rounded shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Cargar Factura</h2>
                    <form onSubmit={handleUpload}>
                        <div className="w-full md:w-1/2">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900"
                                htmlFor="file_input"
                            >
                                Sube la factura
                            </label>
                            <div className="relative">
                                <div className="flex items-center border">
                                    <label
                                        htmlFor="file_input"
                                        className="bg-[#002539] text-white py-2 px-4 rounded shadow cursor-pointer hover:bg-[#003354] focus:outline-none"
                                    >
                                        Seleccionar archivo
                                    </label>
                                    <input
                                        id="file_input"
                                        className="hidden"
                                        type="file"
                                        accept=".xml"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                    <span className="ml-4 truncate text-gray-700 text-sm">
                                        {file?.name || "Ningún archivo seleccionado"}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                                Formato permitido: XML
                            </p>
                        </div>


                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded flex items-center justify-center mt-4"
                            disabled={uploading}
                        >
                            {uploading ? <ImSpinner2 className="animate-spin h-6 w-6" /> : "Cargar"}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white p-6 rounded shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Facturas</h2>
                {loading ? (
                    <div className="flex justify-center items-center py-4">
                        <ImSpinner2 className="animate-spin h-6 w-6 text-gray-500" />
                        <span className="ml-2 text-gray-500">Cargando facturas...</span>
                    </div>
                ) : (
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 whitespace-nowrap">UUID</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Folio</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Emisor</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Receptor</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Moneda</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Total</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Tipo de Cambio</th>
                                <th className="border px-4 py-2 whitespace-nowrap">Gestión</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.length > 0 ? (
                                invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="border px-4 py-2">{invoice.uuid}</td>
                                        <td className="border px-4 py-2">{invoice.folio}</td>
                                        <td className="border px-4 py-2">{invoice.transmitter}</td>
                                        <td className="border px-4 py-2">{invoice.receiver}</td>
                                        <td className="border px-4 py-2">{invoice.currency}</td>
                                        <td className="border px-4 py-2">
                                            {Number(invoice.total).toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {Number(invoice.exchange_rate).toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleDeleteInvoice(invoice.id)}
                                                className="bg-red-500 text-white rounded p-2 hover:bg-red-600 focus:outline-none"
                                                title="Eliminar factura"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="border px-4 py-2 text-center text-gray-500 italic"
                                        colSpan="8"
                                    >
                                        No hay facturas disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default InvoicesPage;
