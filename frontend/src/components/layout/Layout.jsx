import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="relative flex h-screen overflow-hidden">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                closeSidebar={closeSidebar}
            />

            <div
                className={`flex-1 flex flex-col transition-transform duration-300 ${
                    isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
                }`}
            >
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <main className="flex-1 overflow-auto bg-gray-100 p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
