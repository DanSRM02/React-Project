
import './App.css';
import 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/GeneralPages/Home';
import Register from './Components/GeneralPages/Register';
import Login from './Components/GeneralPages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
