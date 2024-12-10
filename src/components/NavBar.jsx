import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [userData, setUserData] = useState({
    nome: '',
    cognome: '',
    nickname: '',
    email: '',
    fotoProfilo: '',
    password: '',
});

// fetch per controllare il login e mettere foto + profilo ---------------------
const location = useLocation();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
      return;
  }

const fetchUserData = async () => {
  try {
      const response = await fetch('http://localhost:3001/utenti/me', {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          throw new Error('Impossibile recuperare i dati dell\'utente');
      }

      const data = await response.json();
      console.log('dati ricevuti pt.2', data)
      setUserData(data);
      
  } catch (error) {
      console.error(error);
      alert('Errore nel recupero dei dati: ' + error.message);
  }
};

fetchUserData();
}, [location]);
// ----------------------------------------------------------------------------


  return (
    <div>

      <ul className="navbar-list d-flex justify-content-between">

        <div className="d-flex">
          <li><Link to="/" className="navbar-home ms-5">ender</Link></li>
        </div>

        <div className="d-flex">
          <li><Link to="/trova" className="navbar-single-list me-5">trova</Link></li>
          <li><Link to="/crea" className="navbar-single-list me-5">crea</Link></li>
          <li><Link to="/stupiscimi" className="navbar-single-list me-5">upgrade</Link></li>
          <li><Link to="/login" className="navbar-single-list me-5"><img
              src={userData.fotoProfilo || "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"}
              alt="Profilo"
              className="foto-profilo me-2"
            />
            {userData.fotoProfilo ? "profilo" : "login"}
            </Link></li>
          <li><Link to="/" className="navbar-home me-5">home</Link></li>
        </div>

      </ul>
    </div>
  );
};

export default NavBar;