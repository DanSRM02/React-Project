import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Products from './pages/products/Products.jsx';
import Login from './pages/login/Login.jsx';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/Register' element={<Register />} /> */}
        <Route path='/products' element={<Products />} />
        {/* <Route path='/User/Create' element={<CreateUser />} />
        <Route path='/data-change' element={<DataChange />} />
        <Route path='/Home/User' element={<HomeUser />} />
        <Route path='/User/CancelOrder' element={<CancelOrder />} />
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
}

export default App;