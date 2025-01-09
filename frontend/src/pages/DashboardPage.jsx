import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { ImSpinner2 } from "react-icons/im";
import api from "../api/axios";
import setPageTitle from "../utils/setPageTitle";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        withPermissions: 0,
        withoutPermissions: 0,
    });
    const [invoiceStats, setInvoiceStats] = useState({
        totalInvoices: 0,
        totalAmount: 0,
        avgAmount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPageTitle("Vista general");

        const fetchData = async () => {
            try {
                const [userRes, invoiceRes] = await Promise.all([
                    api.get("/api/admin/users"),
                    api.get("/api/admin/invoices"),
                ]);

                const withPermissions = userRes.data.filter(
                    (user) => user.permissions && user.permissions.length > 0
                ).length;
                const withoutPermissions = userRes.data.length - withPermissions;

                setUserStats({
                    totalUsers: userRes.data.length,
                    withPermissions,
                    withoutPermissions,
                });

                const totalAmount = invoiceRes.data.reduce((acc, inv) => acc + parseFloat(inv.total), 0);
                const avgAmount = totalAmount / invoiceRes.data.length;

                setInvoiceStats({
                    totalInvoices: invoiceRes.data.length,
                    totalAmount: totalAmount.toFixed(2),
                    avgAmount: avgAmount.toFixed(2),
                });
            } catch (error) {
                console.error("Error al obtener datos: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const userChartData = {
        labels: ["Con Permisos", "Sin Permisos"],
        datasets: [
            {
                label: "Usuarios",
                data: [userStats.withPermissions, userStats.withoutPermissions],
                backgroundColor: ["#002539", "#E42542"],
                hoverBackgroundColor: ["#00334e", "#ad1c32"],
            },
        ],
    };

    const invoiceChartData = {
        labels: ["Total Ingresos", "Promedio por Factura"],
        datasets: [
            {
                label: "Facturas $",
                data: [invoiceStats.totalAmount, invoiceStats.avgAmount],
                backgroundColor: ["#E42542", "#002539"],
                hoverBackgroundColor: ["#ad1c32", "#00334e"],
            },
        ],
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
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg text-gray-700 font-semibold">Usuarios Totales</h3>
                    <p className="text-3xl text-gray-700 font-bold">{userStats.totalUsers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg text-gray-700 font-semibold">Usuarios con permisos</h3>
                    <p className="text-3xl text-gray-700 font-bold">{userStats.withPermissions}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg text-gray-700 font-semibold">Usuarios sin permisos</h3>
                    <p className="text-3xl text-gray-700 font-bold">{userStats.withoutPermissions}</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg text-gray-700 font-semibold">Facturas Totales</h3>
                    <p className="text-3xl text-gray-700 font-bold">{invoiceStats.totalInvoices}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-12 rounded shadow-md flex flex-col items-center justify-center h-96">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Usuarios por Permisos</h3>
                    <div className="flex items-center justify-center w-full h-full">
                        <Doughnut data={userChartData} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded shadow-md flex flex-col items-center justify-center h-96">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Ingresos por Facturas</h3>
                    <div className="w-full h-full">
                        <Bar data={invoiceChartData} />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
