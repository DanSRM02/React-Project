import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './pages/about/About';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<About />} />
        <Route path='/Login' element={<About />} /> */}
        {/* <Route path='/Register' element={<Register />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/User/Create' element={<CreateUser />} />
        <Route path='/data-change' element={<DataChange />} />
        <Route path='/Home/User' element={<HomeUser />} />
        <Route path='/User/CancelOrder' element={<CancelOrder />} />
        <Route path='/Inventory/Home' element={<InventoryHome />} />
        <Route path='/Inventory/Create' element={<InventoryCreate />} />
        <Route path='/Inventory/Edit/:id' element={<InventoryEdit />} />
        <Route path='/Delivery' element={<DeliveryHome />} />
        <Route path='/Review' element={<ReviewView />} />
        <Route path='/Review/Add' element={<AddReview />} /> */}
      </Routes>
    </Router>
  );
}

export default App;