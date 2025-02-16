import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateLayout from '../Components/layout/PrivateLayout.jsx';
import PublicLayout from '../Components/layout/PublicLayout';
import Home from '../pages/index/HomePage.jsx';
import Login from '../pages/index/LoginPage.jsx';
import Products from '../pages/index/ProductsPage.jsx';
import ClientHomePage from '../pages/client/HomePage.jsx';
import CreateOrderPage from '../pages/client/order/CreateOrderPage.jsx';
import VendorHomePage from '../pages/vendor/HomePage.jsx';
import OrdersPage from '../pages/vendor/order/OrdersPage.jsx';

const AppRoutes = () => {
    // Suponiendo que conoces el rol del usuario autenticado
    const userRole = 'client'; // o 'vendor', 'manager', etc. 
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
                {/* <Route path='/Register' element={<Register />} /> */}
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
                    path='/client/home'
                    element={
                        <PrivateLayout role={userRole} title={`${nameSite} / Panel Cliente`}>
                            <ClientHomePage role={"client"} />
                        </PrivateLayout>
                    }
                />

                <Route
                    path='/client/order/create'
                    element={
                        <PrivateLayout role={userRole} title={`${nameSite} / Crear Orden`}>
                            <CreateOrderPage />
                        </PrivateLayout>
                    }
                />

                {/* Rutas privadas para vendedores */}
                <Route
                    path='/vendor/home'
                    element={
                        <PrivateLayout role="vendor" title={`${nameSite} / Panel Vendedor`}>
                            <VendorHomePage role={"vendor"} />
                        </PrivateLayout>
                    }
                />

                <Route
                    path="/vendor/orders"
                    element={
                        <PrivateLayout role="vendor" title={`${nameSite} / Órdenes`}>
                            <OrdersPage />
                        </PrivateLayout>
                    }
                />



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
