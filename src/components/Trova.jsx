import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import MapsTest from "./MapsTest";

const Trova = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [permis, setPermis] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    nickname: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    nome: "",
    descrizione: "",
    dataEvento: "",
    prezzo: "",
    luogo: "",
    fotoEvento: "",
    autore: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  // FETCH PER SCOPRIRE L'UTENTE ATTIVO/LOGGATO
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // setPermis(false);
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
        console.log("Nickname autore :", userData.nickname);
      } catch (error) {
        console.error(error);
        alert("Errore nel recupero dei dati: " + error.message);
      }
    };

    fetchUserData();
  }, [navigate]);
  //-----------------------------------------------------------------------
  // FUNZIONE PER TROVARE TUTTI GLI EVENTI
  const fetchEvent = () => {
    fetch("http://localhost:3001/eventi")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La chiamata non è andata a buon fine!");
        }
      })
      .then((arrayOfEvent) => {
        console.log("Array recuperato", arrayOfEvent);
        setEvent(arrayOfEvent.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Errore nel recupero dei dati", err);
        setIsLoading(false);
        setIsError(true);
      });
  };
  // -----------------------------------------------------------------------
  // FUNZIONE PER ELIMINARE
  const handleDelete = async (eventoId) => {
    // eventoID = res.id
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/eventi/${eventoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(`Evento con ID ${eventoId} eliminato con successo.`);
        // rieseguo la fetch anzichè reload forzato della pagina
        fetchEvent();
        window.alert("L'evento è stato eliminato con successo!");
      } else {
        console.error("Errore durante l eliminazione dell evento");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };
  // -----------------------------------------------------------------------
  // FUNZIONE PER MODIFICARE
  const handleEdit = (eventoId) => {
    const evento = event.find((e) => e.id === eventoId);
    if (evento) {
      setCurrentEvent(evento);
      setUpdatedData({
        nome: evento.nomeEvento,
        descrizione: evento.descrizione,
        dataEvento: evento.dataEvento,
        prezzo: evento.prezzo,
        luogo: evento.luogo,
        fotoEvento: evento.fotoEvento,
        autore: evento.autore.nome,
      });
      setShowModal(true);
      console.log("update data pre modifica", updatedData);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log("poco prima della PUT fetch", JSON.stringify(updatedData));

    try {
      const response = await fetch(
        `http://localhost:3001/eventi/${currentEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Evento aggiornato con successo.");
        fetchEvent();
        setShowModal(false);
      } else {
        console.error("Errore durante l'aggiornamento dell'evento.");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };
  // -----------------------------------------------------------------------

  return (
    <div className="bg-default-2">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center mb-3 body-title">Eventi</h2>
            <div className="d-flex justify-content-center mb-3">
              {isLoading && <Spinner animation="border" variant="info" />}
              {isError && (
                <Alert variant="danger">
                  Oops! Qualcosa è andato storto 😱
                  <i className="bi bi-exclamation-triangle"></i>
                </Alert>
              )}
            </div>
            {isLoading || isError ? (
              <></>
            ) : event.length === 0 ? (
              <Alert variant="info">
                Al momento non è presente nessuna prenotazione :(
              </Alert>
            ) : (
              <Row>
                {event.map((res) => (
                  <Col xs={12} md={6} lg={4} key={res.id} className="mb-4">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={res.fotoEvento}
                        alt="Immagine evento"
                      />
                      <Card.Body>
                        <Card.Title>{res.nomeEvento}</Card.Title>
                        <Card.Text>
                          <strong>Descrizione:</strong>{" "}
                          {typeof res.descrizione === "object"
                            ? JSON.stringify(res.descrizione)
                            : res.descrizione}
                        </Card.Text>
                        <Card.Text>
                          <strong>Autore:</strong>{" "}
                          {typeof res.autore === "object"
                            ? JSON.stringify(res.autore.nome)
                            : res.autore}
                        </Card.Text>
                        <Card.Text>
                          <strong>Data:</strong>{" "}
                          {res.dataEvento
                            ? new Date(res.dataEvento).toLocaleDateString()
                            : "Data non disponibile"}
                        </Card.Text>
                        <Card.Text>
                          <strong>Prezzo:</strong>{" "}
                          {typeof res.prezzo === "object"
                            ? JSON.stringify(res.prezzo)
                            : res.prezzo}{" "}
                          €
                        </Card.Text>
                        <Card.Text>
                          <strong>Luogo:</strong>{" "}
                          {typeof res.luogo === "object"
                            ? JSON.stringify(res.luogo)
                            : res.luogo}
                        </Card.Text>

                        {res.autore.nome === userData.nickname && (
                          <div className="d-flex justify-content-between">
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(res.id)}
                            >
                              Elimina
                            </Button>
                            <Button
                              variant="warning"
                              onClick={() => handleEdit(res.id)}
                            >
                              Modifica
                            </Button>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <MapsTest />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNomeEvento">
              <Form.Label>Nome Evento</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.nome}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, nomeEvento: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedData.descrizione}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    descrizione: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDataEvento">
              <Form.Label>Data Evento</Form.Label>
              <Form.Control
                type="date"
                value={updatedData.dataEvento}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, dataEvento: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrezzo">
              <Form.Label>Prezzo</Form.Label>
              <Form.Group controlId="formPrezzo">
                <Form.Label>Prezzo</Form.Label>
                <Form.Control
                  type="number"
                  value={updatedData.prezzo}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      prezzo: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="formLuogo">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.luogo}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, luogo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFotoEvento">
              <Form.Label>Foto Evento (URL)</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.fotoEvento}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, fotoEvento: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAutore">
              <Form.Label>Autore</Form.Label>
              <Form.Control type="text" value={updatedData.autore} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>

      <MapsTest />
    </div>
  );
};

export default Trova;
