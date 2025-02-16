import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateLayout from '../Components/layout/PrivateLayout.jsx';
import PublicLayout from '../Components/layout/PublicLayout';
import Home from '../pages/index/HomePage.jsx';
import Login from '../pages/index/LoginPage.jsx';
import Products from '../pages/index/ProductsPage.jsx';
import ClientHomePage    from '../pages/client/ClientHomePage.jsx';

const AppRoutes = () => {
    // Suponiendo que conoces el rol del usuario autenticado
    const userRole = 'empresarial'; // o 'vendor', 'manager', etc.    

    return (
        <Router>
            <Routes>
                {/* Rutas Públicas */}
                <Route
                    path="/"
                    element={
                        <PublicLayout>
                            <Home />
                        </PublicLayout>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <PublicLayout>
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
                        <PrivateLayout role={userRole} title="Panel Cliente">
                            <ClientHomePage role={userRole} />
                        </PrivateLayout>
                    }
                />

                {/* <Route path='/client/addOrder' element={<CreateOrderPage />} /> */}

                {/* Rutas privadas para vendedores */}
                {/* <Route
                    path="/vendor/inventory"
                    element={
                        <PrivateLayout role="vendor" title="Panel Vendedor">
                            <InventoryPage />
                        </PrivateLayout>
                    }
                /> */}



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
