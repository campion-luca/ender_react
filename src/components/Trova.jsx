import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import MapsTest from "./MapsTest";

const Trova = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permis, setPermis] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    nickname: "",
});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  // FETCH PER SCOPRIRE L'UTENTE ATTIVO/LOGGATO
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPermis(false);
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
        console.log("Nickname autore :",userData.nickname);
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
  const handleDelete = () => {

  }

  // -----------------------------------------------------------------------
  // FUNZIONE PER MODIFICARE
  const handleEdit = () => {

  }
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
                <Card.Img variant="top" src={res.fotoEvento} alt="Immagine evento" />
                <Card.Body>
                  <Card.Title>{res.nomeEvento}</Card.Title>
                  <Card.Text>
                    <strong>Descrizione:</strong> {typeof res.descrizione === 'object' ? JSON.stringify(res.descrizione) : res.descrizione}
                  </Card.Text>
                  <Card.Text>
                    <strong>Autore:</strong> {typeof res.autore === 'object' ? JSON.stringify(res.autore.nome) : res.autore}
                  </Card.Text>
                  <Card.Text>
                    <strong>Data:</strong> {res.dataEvento ? new Date(res.dataEvento).toLocaleDateString() : 'Data non disponibile'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Prezzo:</strong> {typeof res.prezzo === 'object' ? JSON.stringify(res.prezzo) : res.prezzo} €
                  </Card.Text>

                  {/* res.id === userData.id */}

                  {res.autore.nome === userData.nickname && (
                    <div className="d-flex justify-content-between">
                      <Button variant="danger" onClick={() => handleDelete(res.id)}>
                        Elimina
                      </Button>
                      <Button variant="warning" onClick={() => handleEdit(res.id)}>
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
    </div>
  );
};

export default Trova;
