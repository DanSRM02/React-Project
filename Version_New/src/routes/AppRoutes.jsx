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
import OrdersPage from '../feature/order/OrdersPage.jsx';
import Register from '../feature/auth/RegisterPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

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
                        <PublicLayout title={`${nameSite} / Log in`}>
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
                            <PrivateLayout title={`${nameSite} / Crear Orden`}>
                                <CreateOrderPage />
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
                                <OrdersPage />
                            </PrivateLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Ruta por defecto si no coincide ninguna */}
                <Route path="*" element={<Navigate to={"/"} replace />} />

                {/* <Route path='/User/Create' element={<CreateUser />} />
                <Route path='/data-change' element={<DataChange />} />*/}

                {/* <Route path='/User/CancelOrder' element={<CancelOrder />} />
                <Route path='/Inventory/Home' element={<InventoryHome />} />
                <Route path='/Inventory/Create' element={<InventoryCreate />} />
                <Route path='/Inventory/Edit/:id' element={<InventoryEdit />} />
                <Route path='/Delivery' element={<DeliveryHome />} />
                <Route path='/Review' element={<ReviewView />} />
                <Route path='/Review/Add' element={<AddReview />} /> */}
                {/* <Route element={<Error404 />}></Route> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
