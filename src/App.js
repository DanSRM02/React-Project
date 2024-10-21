
import './App.css';
import 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/GeneralPages/Home';
import Register from './Components/GeneralPages/Register';
import Login from './Components/GeneralPages/Login';
import Products from './Components/GeneralPages/Products';
import "./Styles/index.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Products' element={<Products/>}/>
      </Routes>
    </Router>
  );
}

export default App;
