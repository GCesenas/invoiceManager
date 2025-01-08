import React, { useEffect } from "react";
import setPageTitle from "../utils/setPageTitle";

const Dashboard = () => {
    useEffect(() => {
        setPageTitle("Vista general");
    }, []);

    return (
        <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">Bienvenido al Dashboard</h2>
            <p className="text-gray-600 mt-2">Ejemplo de dashboard</p>
        </div>
    );
};

export default Dashboard;
