import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/LoginPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UsersAdminPage from "./pages/UsersAdminPage";
import Layout from "./components/layout/Layout";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/unauthorized"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <UnauthorizedPage />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <DashboardPage />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute requiredPermissions={['manage-users']}>
                                <Layout>
                                    <UsersAdminPage />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
