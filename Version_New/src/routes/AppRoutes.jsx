import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PrivateLayout from '../components/layout/PrivateLayout.jsx';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../feature/index/HomePage.jsx';
import Login from '../feature/auth/LoginPage.jsx';
import Products from '../feature/index/ProductsPage.jsx';
import ClientHomePage from '../feature/client/HomePage.jsx';
import CreateOrderPage from '../feature/order/CreateOrderPage.jsx';
import VendorHomePage from '../feature/vendor/HomePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Register from '../feature/auth/RegisterPage.jsx';
import ManagerHomePage from '../feature/manager/HomePage.jsx';
import CreateUserPage from '../feature/manager/CreateUser.jsx';
import ProductsPage from '../feature/products/ProductPage.jsx';
import OrdersClientPage from '../feature/order/OrdersClientPage.jsx';
import OrdersVendorPage from '../feature/order/OrdersVendorPage.jsx';

const AppRoutes = () => {
    // Suponiendo que conoces el rol del usuario autenticado
    const nameSite = 'OXI';

    return (
        <Router>
            <Routes>
                {/* Rutas Públicas */}
                <Route
                    path="/"
                    element={
                        <PublicLayout title={`${nameSite} / Sítio Principal`}>
                            <Home />
                        </PublicLayout>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <PublicLayout title={`${nameSite} / Log in`}>
                            <Login />
                        </PublicLayout>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <PublicLayout title={`${nameSite} / Registrarse`}>
                            <Register />
                        </PublicLayout>
                    }
                />
                <Route
                    path='/products'
                    element={
                        <PublicLayout>
                            <Products />
                        </PublicLayout>
                    }
                />

                {/* Rutas privadas para clientes */}
                <Route
                    path="/client/home"
                    element={
                        <ProtectedRoute allowedRoles={["cliente"]}>
                            <PrivateLayout title={`${nameSite} / Panel Cliente`}>
                                <ClientHomePage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/client/order/create"
                    element={
                        <ProtectedRoute allowedRoles={["cliente"]}>
                            <PrivateLayout title={`${nameSite} / Crear Órden`}>
                                <CreateOrderPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/client/orders"
                    element={
                        <ProtectedRoute allowedRoles={["cliente"]}>
                            <PrivateLayout title={`${nameSite} / Mis Órdenes`}>
                                <OrdersClientPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                {/* Rutas privadas para vendedores */}
                <Route
                    path="/vendor/home"
                    element={
                        <ProtectedRoute allowedRoles={["vendedor"]}>
                            <PrivateLayout title={`${nameSite} / Panel Vendedor`}>
                                <VendorHomePage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/vendor/orders"
                    element={
                        <ProtectedRoute allowedRoles={["vendedor"]}>
                            <PrivateLayout title={`${nameSite} / Órdenes`}>
                                <OrdersVendorPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/vendor/products"
                    element={
                        <ProtectedRoute allowedRoles={["vendedor"]}>
                            <PrivateLayout title={`${nameSite} / Productos`}>
                                <ProductsPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Rutas privadas para gerentes */}
                <Route
                    path="/manager/home"
                    element={
                        <ProtectedRoute allowedRoles={["gerente"]}>
                            <PrivateLayout title={`${nameSite} / Panel Gerente`}>
                                <ManagerHomePage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    } />

                <Route
                    path="/manager/users"
                    element={
                        <ProtectedRoute allowedRoles={["gerente"]}>
                            <PrivateLayout title={`${nameSite} / Gestión de Usuarios`}>
                                <CreateUserPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                {/* Ruta por defecto si no coincide ninguna */}
                <Route path="*" element={<Navigate to={"/unauthtorized"} replace />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
