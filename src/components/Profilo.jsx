import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    nickname: "",
    email: "",
    fotoProfilo: "",
    password: "",
    role: "USER",
  });
  const [isEditing, setIsEditing] = useState(false);

  // FUNZIONE PER RACCOLTA DATI /ME
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
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
        setUserData(data);
      } catch (error) {
        console.error(error);
        alert("Errore nel recupero dei dati: " + error.message);
      }
    };

    fetchUserData();
  }, [navigate]);
  // ----------------------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // FUNZIONE PER IL REINDIRIZZAMENTO
  const handleRedirect = () => {
    navigate("/upgrade");
  };
  // ----------------------------------------------------------
  // Funzione per il logout
  const handleLogout = () => {
    console.log("funziona Luca");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };
  // ----------------------------------------------------------
  //   Funzione per eliminare il proprio profilo
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const deleteUserProfile = async () => {
      // Pop-up di conferma
      const isConfirmed = window.confirm(
        "Sei sicuro di voler cancellare il tuo profilo? Questa operazione è irreversibile."
      );

      if (!isConfirmed) {
        return; // Annulla l'operazione se l'utente preme "Annulla"
      }

      try {
        const response = await fetch("http://localhost:3001/utenti/me", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Impossibile cancellare il profilo");
        }

        // const result = await response.json();
        console.log("Profilo cancellato con successo:");
        window.location.reload();
        localStorage.removeItem("token");

        navigate("/login"); // Redirige l'utente alla pagina di login
      } catch (error) {
        console.error(error);
        alert("Errore nella cancellazione del profilo: " + error.message);
      }
    };

    deleteUserProfile();
  };
  // ----------------------------------------------------------

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  // FUNZIONE PER L'UPDATE DEI DATI PROFILO ---------------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    // CONTROLLI DEGLI INPUT
    // Validazione
    if (userData.nome.length < 3 || userData.nome.length > 20) {
      alert("Il nome deve essere più lungo di 3 caratteri e più corto di 20.");
      return;
    }
    if (userData.cognome.length < 3 || userData.cognome.length > 30) {
      alert(
        "Il cognome deve essere più lungo di 3 caratteri e più corto di 30."
      );
      return;
    }
    if (
      userData.nickname.length < 3 ||
      userData.nickname.length > 20 ||
      userData.nickname === userData.precedenteNickname
    ) {
      alert(
        "Il nickname deve essere più lungo di 3 caratteri, più corto di 20, e diverso dal precedente."
      );
      return;
    }
    // ---------------------------------------------------------------------
    const token = localStorage.getItem("token");

    // CHECK TOKEN
    console.log("TOKEN ????", token);

    try {
      const response = await fetch("http://localhost:3001/utenti/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // CHECK DATI PASSATI
      console.log(userData);

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dei dati");
      }

      //   const updatedData = await response.json();

      console.log("situazione attuale dello stato", userData);

      //   setUserData(userData);
      setIsEditing(false);
      window.location.reload();
      // alert('Dati aggiornati con successo!');
    } catch (error) {
      console.error(error);
      alert("Errore: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h3>Profilo</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <img
                    src={
                      userData.fotoProfilo || "https://via.placeholder.com/150"
                    }
                    alt="Foto Profilo"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>

                {/* URL Foto Profilo */}
                <div className="mb-3">
                  <label htmlFor="fotoProfilo" className="form-label">
                    URL Foto Profilo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="fotoProfilo"
                      name="fotoProfilo"
                      className="form-control"
                      value={userData.fotoProfilo}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <p>{userData.fotoProfilo}</p>
                  )}
                </div>

                {/* NOME */}
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      className="form-control"
                      value={userData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <p>{userData.nome}</p>
                  )}
                </div>

                {/* COGNOME */}
                <div className="mb-3">
                  <label htmlFor="cognome" className="form-label">
                    Cognome
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="cognome"
                      name="cognome"
                      className="form-control"
                      value={userData.cognome}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <p>{userData.cognome}</p>
                  )}
                </div>

                {/* NICKNAME */}
                <div className="mb-3">
                  <label htmlFor="nickname" className="form-label">
                    Nickname
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="nickname"
                      name="nickname"
                      className="form-control"
                      value={userData.nickname}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <p>{userData.nickname}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <p>{userData.email}</p>
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={userData.password}
                    readOnly
                  />
                </div>

                <div className="text-center">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-success me-2"
                        onClick={handleUpdate}
                      >
                        Salva
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Annulla
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleEditToggle}
                    >
                      Modifica
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleRedirect}
              >
                Diventa organizzatore
              </button>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Cancella profilo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
