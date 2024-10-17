
import './App.css';
import 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Importa la página
import Home from './Components/GeneralPages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
