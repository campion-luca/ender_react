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
import Swal from "sweetalert2";

const Trova = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [permis, setPermis] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    nickname: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(true);
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


  // FUNZIONE PER MOSTRARE/NASCONDERE LA MAPPA
  const handleShow = () => {
    setShowMap(!showMap);
  }
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
    <div className="bg-trova">
      <h2 className="text-center mb-3 body-title">Eventi</h2>

      <div>
        <div className="d-flex justify-content-center">
        <Button onClick={handleShow} className="btn-stupiscimi">{showMap ? ( "Mostra mappa") : ("Elenco eventi")}</Button>
        </div>

        {showMap ?
        
        
        (
          <>

          <Container>
          <Row className="mb-4">
            <Col xs={12} md={12} lg={12}>
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
  <Card className="card-evento shadow">
    
    <Card.Body>
  
    <Card.Img
      variant="top"
      src={res.fotoEvento}
      alt="Immagine evento"
      className="card-img"
    />
      <Card.Text>
        <span className="card-resp card-int">{res.nomeEvento}</span>
      </Card.Text>
      <Card.Text>
        <span className="card-resp">
        {typeof res.descrizione === "object"
          ? JSON.stringify(res.descrizione)
          : res.descrizione}</span>
      </Card.Text>
      <Card.Text>
        <strong className="card-title">il</strong>{" "}
        <span className="card-resp">
        {res.dataEvento
          ? new Date(res.dataEvento).toLocaleDateString()
          : "Data non disponibile"}</span>
      </Card.Text>
      <Card.Text>
        <strong className="card-title">Prezzo:</strong>{" "}
        <span className="card-resp">
        {typeof res.prezzo === "object"
          ? JSON.stringify(res.prezzo)
          : res.prezzo}{" "}€</span>
      </Card.Text>
      <Card.Text>
        <strong className="card-title">Dove?</strong>{" "}
        <span className="card-resp">
        {typeof res.luogo === "object"
          ? JSON.stringify(res.luogo)
          : res.luogo}</span>
      </Card.Text>
      <Card.Text>
        <strong className="card-title">Organizzato da</strong>{" "}
        <span className="card-resp">
        {typeof res.autore === "object"
          ? JSON.stringify(res.autore.nome)
          : res.autore}</span>
      </Card.Text>
    </Card.Body>
  
    <Card.Body className="text-center">
      {res.autore.nome === userData.nickname && (
        <div className="d-flex justify-content-between">
          <Button
            variant="danger"
            className="card-button"
            onClick={() => handleDelete(res.id)}
          >
            Elimina
          </Button>
          <Button
            variant="warning"
            className="card-button"
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
  
        
  
        <Modal show={showModal} onHide={() => setShowModal(false)}>
  
          <Modal.Header closeButton className="trova-modal">
          
            <Modal.Title>Modifica Evento</Modal.Title>
          </Modal.Header>
  
          <Modal.Body className="trova-modal">
            <Form>
              <Form.Group controlId="formNomeEvento">
                <Form.Label>Nome Evento</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedData.nome}
                  className="form-crea"
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
                  className="form-crea"
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
                  className="form-crea"
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, dataEvento: e.target.value })
                  }
                />
                <Form.Group controlId="formPrezzo">
                  <Form.Label>Prezzo</Form.Label>
                  <Form.Control
                    type="number"
                    value={updatedData.prezzo}
                    className="form-crea"
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
                  className="form-crea"
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
                  className="form-crea"
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, fotoEvento: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAutore">
                <Form.Label>Autore</Form.Label>
                <Form.Control type="text" value={updatedData.autore} readOnly className="form-crea" />
              </Form.Group>
            </Form>
          </Modal.Body>
  
          <Modal.Footer className="trova-modal">
  
            <Button variant="secondary" className="button-crea" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="primary" className="button-crea" onClick={handleUpdateSubmit}>
              Salva Modifiche
            </Button>
          </Modal.Footer>
        </Modal>

        </>
        )
        :

        (<MapsTest />) }


      </div>
    </div>
  );
};

export default Trova;
