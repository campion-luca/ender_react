import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

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

    <div className="profilo-sfondo">

    <h2 className="text-center mb-2 body-title">Profilo</h2>

    <Container>
        <Row className="justify-content-center">
          <Col md={8}>

            <Card className="profilo-container">

              <Card.Body>
                <Form onSubmit={handleUpdate}>
                  {/* URL Foto Profilo e Foto Profilo sulla stessa riga */}
                  <Row className="mb-3 d-flex justify-content-between align-items-center">
                    <Col xs={9}>
                      <Form.Label htmlFor="fotoProfilo" className="profilo-text">URL Foto Profilo</Form.Label>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          id="fotoProfilo"
                          name="fotoProfilo"
                          value={userData.fotoProfilo}
                          onChange={handleInputChange}
                          required
                          className="form-profilo"
                        />
                      ) : (
                        <p className="profilo-text-sotto">{userData.fotoProfilo}</p>
                      )}
                    </Col>
                    <Col xs={3}>
                      <img
                        src={userData.fotoProfilo || "https://via.placeholder.com/150"}
                        alt="Foto Profilo"
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </Col>
                  </Row>

                  {/* Nome */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="nome" className="profilo-text">Nome</Form.Label>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        id="nome"
                        name="nome"
                        value={userData.nome}
                        onChange={handleInputChange}
                        required
                        className="form-profilo"
                      />
                    ) : (
                      <p className="profilo-text-sotto">{userData.nome}</p>
                    )}
                  </Form.Group>

                  {/* Cognome */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="cognome" className="profilo-text">Cognome</Form.Label>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        id="cognome"
                        name="cognome"
                        value={userData.cognome}
                        onChange={handleInputChange}
                        required
                        className="form-profilo"
                      />
                    ) : (
                      <p className="profilo-text-sotto">{userData.cognome}</p>
                    )}
                  </Form.Group>

                  {/* Nickname */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="nickname" className="profilo-text">Nickname</Form.Label>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={userData.nickname}
                        onChange={handleInputChange}
                        required
                        className="form-profilo"
                      />
                    ) : (
                      <p className="profilo-text-sotto">{userData.nickname}</p>
                    )}
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className="profilo-text">Email</Form.Label>
                    <p className="profilo-text-sotto">{userData.email}</p>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password" className="profilo-text">Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      value={userData.password}
                      readOnly
                      className="profilo-password"
                    />
                  </Form.Group>

                  {/* Pulsanti nella stessa riga */}
                  <div className="d-flex justify-content-between text-center">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-success me-2 button-organizzatore"
                          onClick={handleUpdate}
                        >
                          Salva
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary button-logout"
                          onClick={() => setIsEditing(false)}
                        >
                          Annulla
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary button-modifica"
                        onClick={handleEditToggle}
                      >
                        Modifica
                      </button>
                    )}
                  </div>
                </Form>
              </Card.Body>

              <Card.Footer className="text-center">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-danger button-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                  <button
                    type="button"
                    className="btn btn-success button-organizzatore"
                    onClick={handleRedirect}
                  >
                    Diventa organizzatore
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger button-delete"
                    onClick={handleDelete}
                  >
                    Cancella profilo
                  </button>
                </div>
              </Card.Footer>

            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
