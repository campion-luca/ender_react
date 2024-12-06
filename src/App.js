import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' // import di bootstrap
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Body from './components/Body';
import Footer from './components/Footer';
import Crea from './components/Crea';
import Stupiscimi from './components/Stupiscimi';
import Contact from './components/Contact';
import Cerca from './components/Cerca'
import Login from './components/Login'
import Profilo from './components/Profilo'

function App() {
  return (
    <div className="bg-color-rolex">
    <BrowserRouter>

    <NavBar />

        <Routes>

        <Route path="/" element={<Body />} />
        <Route path="/crea" element={<Crea />} />
        <Route path="/stupiscimi" element={<Stupiscimi />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trova" element={<Cerca />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profilo" element={<Profilo />} />

        </Routes>

    <Footer />  
    </BrowserRouter>
    </div>
  );
}

export default App