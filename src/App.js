import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' // import di bootstrap
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Crea from './components/Crea';
import Contact from './components/Contact';
import Trova from './components/Trova'
import Login from './components/Login'
import Profilo from './components/Profilo'
import Upgrade from './components/Upgrade';

function App() {
  return (
    <div className="bg-default">
    <BrowserRouter>

    <NavBar />

        <Routes>

        <Route path="/" element={<Home />} />  {/* HOME PAGE */}
        <Route path="/crea" element={<Crea />} />  {/* CREAZIONE EVENTI */}
        <Route path="/trova" element={<Trova />} />  {/* TROVA L'EVENTO <3 */}
        <Route path="/login" element={<Login />} />  {/* LOGIN ACCOUNT */}
        <Route path="/profilo" element={<Profilo />} />  {/* ME / COMPONENT */}

        {/* DA FARE */}
        <Route path="/stupiscimi" element={<Upgrade />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>


    </BrowserRouter>
    </div>
  );
}

export default App