
import './App.css';
import 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/GeneralPages/Home';
import Register from './Components/GeneralPages/Register';
import Login from './Components/GeneralPages/Login';
import Products from './Components/GeneralPages/Products';
import "./Styles/index.css";
import CreateUser from './Components/User/CreateUser';  
import DataChange from './Components/User/DataChange';
import HomeUser from './Components/User/HomeUser';
import CancelOrder from './Components/User/CancelOrder';
import InventoryHome from './Components/Inventory/InventoryHome';
import InventoryCreate from './Components/Inventory/InventoryCreate';
import InventoryForm from './Components/Inventory/InventoryForm';
import InventoryEdit from './Components/Inventory/InventoryEdit';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Products' element={<Products/>}/>
        <Route path='/User/Create' element={<CreateUser/>}/>
        <Route path='/data-change' element={<DataChange/>}/>
        <Route path='/Home/User' element={<HomeUser/>}/>
        <Route path='/User/CancelOrder' element={<CancelOrder/>}/>
        <Route path='/Inventory/Home' element={<InventoryHome/>}/>
        <Route path='/Inventory/Create' element={<InventoryCreate/>}/>
        <Route path='/Inventory/Form' element={<InventoryForm/>}/>
        <Route path='/Inventory/Edit' element={<InventoryEdit/>}/>
      </Routes>
    </Router>
  );
}

export default App;
