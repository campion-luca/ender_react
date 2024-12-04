import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' // import di bootstrap
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar';
import { Body } from './components/Body';
import Footer from './components/Footer';
import { Create } from './components/Create';
import { Trova } from './components/Trova';
import { Stupiscimi } from './components/Stupiscimi';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="bg-color-rolex">
    <BrowserRouter>

    <NavBar />

        <Routes>

        <Route path="/" element={<Body />} />
        <Route path="/crea" element={<Create />} />
        <Route path="/trova" element={<Trova />} />
        <Route path="/stupiscimi" element={<Stupiscimi />} />
        <Route path="/contact" element={<Contact />} />

        </Routes>

    <Footer />  
    </BrowserRouter>
    </div>
  );
}

export default App