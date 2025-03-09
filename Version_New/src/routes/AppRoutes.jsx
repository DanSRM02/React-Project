import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PrivateLayout from '../components/layout/PrivateLayout.jsx';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../feature/index/HomePage.jsx';
import Products from '../feature/index/ProductsPage.jsx';
import ClientHomePage from '../feature/client/HomePage.jsx';
import CreateOrderPage from '../feature/order/CreateOrderPage.jsx';
import VendorHomePage from '../feature/vendor/HomePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Register from '../feature/auth/RegisterPage.jsx';
import ManagerHomePage from '../feature/manager/HomePage.jsx';
import CreateUserPage from '../feature/manager/ManageUser.jsx';
import ProductsPage from '../feature/products/VendorProductPage.jsx';
import OrdersClientPage from '../feature/order/OrdersClientPage.jsx';
import OrdersVendorPage from '../feature/order/OrdersVendorPage.jsx';
import DomiciliaryHomePage from '../feature/delivery/HomePage.jsx';
import ReviewsPage from '../feature/review/ReviewsClientPage.jsx';
import UnauthorizedPage from '../feature/index/UnauthorizedPage.jsx';
import CreateReviewPage from '../feature/review/CreateReviewPage.jsx';
import AccountSettings from '../feature/client/AccountPage.jsx';
import OrdersPendingPage from '../feature/order/OrdersPendingPage.jsx';
import ManageProductPage from '../feature/products/ManageProductPage.jsx';
import Login from '../feature/auth/LoginPage.jsx';
import { Logout } from '../feature/auth/Logout.jsx';
import DeliveriesPage from '../feature/delivery/DeliveriesPage.jsx';

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
                <Route
                    path="/client/reviews"
                    element={
                        <ProtectedRoute allowedRoles={["cliente"]}>
                            <PrivateLayout title={`${nameSite} / Mis Reseñas`}>
                                <ReviewsPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/client/review/new"
                    element={
                        <ProtectedRoute allowedRoles={["cliente"]}>
                            <PrivateLayout title={`${nameSite} / Crear Reseña`}>
                                <CreateReviewPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/client/account"
                    element={
                        <ProtectedRoute allowedRoles={["cliente"]}>
                            <PrivateLayout title={`${nameSite} / Mi Cuenta`}>
                                <AccountSettings />
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
                    path="/vendor/account"
                    element={
                        <ProtectedRoute allowedRoles={["vendedor"]}>
                            <PrivateLayout title={`${nameSite} / Mi cuenta`}>
                                <AccountSettings />
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
                <Route
                    path="/manager/account"
                    element={
                        <ProtectedRoute allowedRoles={["gerente"]}>
                            <PrivateLayout title={`${nameSite} / Mi cuenta`}>
                                <AccountSettings />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manager/product"
                    element={
                        <ProtectedRoute allowedRoles={["gerente"]}>
                            <PrivateLayout title={`${nameSite} / Mi cuenta`}>
                                <ManageProductPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Rutas privadas para gerentes */}
                <Route
                    path="/delivery/home"
                    element={
                        <ProtectedRoute allowedRoles={["domiciliario"]}>
                            <PrivateLayout title={`${nameSite} / Panel Domiciliario`}>
                                <DomiciliaryHomePage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/delivery/account"
                    element={
                        <ProtectedRoute allowedRoles={["domiciliario"]}>
                            <PrivateLayout title={`${nameSite} / Mi cuenta`}>
                                <AccountSettings />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/delivery/history/orders"
                    element={
                        <ProtectedRoute allowedRoles={["domiciliario"]}>
                            <PrivateLayout title={`${nameSite} / Historial Órdenes `}>
                                <OrdersPendingPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/delivery/orders"
                    element={
                        <ProtectedRoute allowedRoles={["domiciliario"]}>
                            <PrivateLayout title={`${nameSite} / Órdenes por Despachar`}>
                                <DeliveriesPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/logout" element={<Logout />}></Route>

                {/* Ruta por defecto si no coincide ninguna */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<Navigate to="/unauthorized" replace />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
