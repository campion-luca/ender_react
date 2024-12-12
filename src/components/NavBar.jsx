import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [hasPermiss, setHasPermiss] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    nickname: "",
    email: "",
    fotoProfilo: "",
    password: "",
    role: "USER",
  });

  // fetch per controllare il login e mettere foto + profilo ---------------------
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/utenti/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Impossibile recuperare i dati dell'utente");
        }

        const data = await response.json();
        console.log("dati ricevuti pt.2", data);

        // CONTROLLO PER I PERMESSI ---------------------------------------------------
        if (data.role === "ADMIN") {
          console.log("ADMIN");
          setHasPermiss(true);
        } else if (data.role === "ORGANIZZATORE") {
          console.log("ORGANIZZATORE");
          setHasPermiss(true);
        } else if (data.role === "USER") {
          console.log("USER");
          // setHasPermiss(false) --> già impostato di default
        }
        setUserData(data);
      } catch (error) {
        console.error(error);
        alert("Errore nel recupero dei dati: " + error.message);
      }
    };

    fetchUserData();
  }, [location]);
  // ----------------------------------------------------------------------------

  return (

    <div className="navbar-container">

      <ul className="navbar-list d-flex justify-content-around">

          <li className="navbar-li">
            <Link to="/upgrade" className="navbar-single-list-laterale me-5">
              upgrade
            </Link>
          </li>

          {hasPermiss && (
            <li className="navbar-li">
              <Link to="/crea" className="navbar-single-list me-5">
                crea
              </Link>
            </li>
          )}


          <li className="navbar-li">
            <Link to="/" className="navbar-home me-5">
              home
            </Link>
          </li>

          <li className="navbar-li">
            <Link to="/trova" className="navbar-single-list me-5">
              trova
            </Link>
          </li>


          <li className="navbar-li">
            <Link to="/login" className="navbar-single-list-laterale me-5">
              <img
                src={
                  userData.fotoProfilo ||
                  "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                }
                alt="Profilo"
                className="foto-profilo me-2"
              />
              {userData.fotoProfilo ? "profilo" : "login"}
            </Link>
          </li>

      </ul>

    </div>
  );
};

export default NavBar;
