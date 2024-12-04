import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' // import di bootstrap
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import { Body } from './components/Body';

function App() {
  return (
    <div className="bg-color-rolex">
    <BrowserRouter>
    
    <NavBar />

        <Routes>
        {/* not found */}
        <Route path="/" element={<Body />} />
        </Routes>

    </BrowserRouter>

    </div>
  );
}

export default App