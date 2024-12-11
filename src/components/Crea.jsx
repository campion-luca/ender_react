import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  FormGroup,
} from "react-bootstrap";

const Crea = () => {
  const token = localStorage.getItem("token");
  const [fetchFatta, setFetchData] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    nickname: "",
    email: "",
    fotoProfilo: "",
    password: "",
    role: "USER",
    fotoEvento: "",
  });
  const [event, setEvent] = useState({
    nome: "",
    descrizione: "",
    prezzo: "",
    dataEvento: "",
    luogo: "",
    autore: "",
    fotoEvento: "",
  });
  // --------------------------------------------------------------
  // FUNZIONE PER PRENDERE I DATI DELL'AUTORE "ATTIVO"/"LOGGATO"
  useEffect(() => {
    const token = localStorage.getItem("token");

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
        // console.log("dati ricevuti pt.2", data);
        setUserData(data);
        setFetchData(true);
      } catch (error) {
        console.error(error);
        alert("Errore nel recupero dei dati: " + error.message);
      }
    };

    fetchUserData();
  }, []);
  // --------------------------------------------------------------
  // FUNZIONE SALVATAGGIO PREZZO AUTOMATISMO
  useEffect(() => {
    if (event.tipoEvento === "free") {
      console.log("cambio prezzo okay!", event.prezzo);
      setEvent((prevEvent) => ({
        ...prevEvent,
        prezzo: 0.0,
      }));
    } // else if
  }, [event.tipoEvento]);
  // --------------------------------------------------------------
  // FUNZIONE SALVATAGGIO AUTOMATICO AUTORE
  useEffect(() => {
    if (userData.nickname) {
      handleChange({ target: { value: userData.nickname } }, "autore");
    }
  }, [fetchFatta]);
  // --------------------------------------------------------------
  // FUNZIONE SALVATAGGIO CAMPI
  const handleChange = (e, property) => {
    setEvent({
      ...event,
      [property]: e.target.value,
    });
  };
  // --------------------------------------------------------------
  // FUNZIONE PER CREARE L'EVENTO /POST
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:3001/eventi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Evento salvato!");
          // MODIFICA ANCHE QUESTO
          alert("salvato, modificami");

          setEvent({
            nome: "",
            descrizione: "",
            prezzo: "",
            dataEvento: "",
            luogo: "",
            fotoEvento: "",
          });
        } else {
          // MODIFICA
          alert("Riprova più tardi, modificami");
          throw new Error("errore!");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
// --------------------------------------------------------------

  return (
    <div>
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-3 body-title">Crea</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome dell'evento?"
                  required
                  onChange={(e) => {
                    setEvent({
                      ...event,
                      nome: e.target.value,
                    });
                  }}
                  value={event.nome}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>descrizione</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci una descrizione dell'evento"
                  required
                  onChange={(e) => {
                    handleChange(e, "descrizione");
                  }}
                  value={event.descrizione}
                />
              </Form.Group>

              {/* FORM SCELTA TIPOLOGIA DI EVENTO / COSTO */}

              <FormGroup className="mb-3">
                <Form.Label>Metodologia d'accesso</Form.Label>
                <select
                  className="form-select"
                  value={event.tipoEvento}
                  onChange={(e) => handleChange(e, "tipoEvento")}
                >
                  <option value="">Seleziona il tipo di evento</option>
                  <option value="free">Evento gratuito aperto a tutti</option>
                  <option value="pay">
                    Biglietto acquistabile solo sul posto
                  </option>
                  <option value="pr">
                    Necessaria prevendita per accedere, numero chiuso
                  </option>
                  <option value="exc">
                    Evento riservato esclusivamente a...
                  </option>
                </select>
              </FormGroup>

              {/* CONDIZIONALE IN BASE ALLA SCELTA */}

              {event.tipoEvento === "free" && event.prezzo === 0.0}

              {event.tipoEvento === "pay" && (
                <Form.Group className="mb-3">
                  <Form.Label>Prezzo</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="inserisci il prezzo"
                    step="0.01" // accetta solo DOUBLE !
                    min="0" // non GRATIS
                    required
                    onChange={(e) => {
                      handleChange(e, "prezzo");
                    }}
                    value={event.prezzo}
                  />
                </Form.Group>
              )}

              {event.tipoEvento === "pr" && (
                <Form.Group className="mb-3">
                  <Form.Label>
                    Inserisci il link al quale poter acquistare la prevendita
                  </Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="link"
                    onChange={(e) => {
                      setEvent((prevEvent) => ({
                        ...prevEvent,
                        descrizione: `${prevEvent.descrizione || ""} ${
                          e.target.value
                        }`.trim(), // per non sovrascrivere
                        // https://www.tsunaminutrition.it/carrello?action=show&_gl=1*gdxhvc*_up*MQ..*_gs*MQ..&gclid=CjwKCAiAjeW6BhBAEiwAdKltMqKKuy6vKJ0oaaIa9MaAlDRQN47Xcffy4QRoC8DsE1k5XOtBAjUjsBoC0XAQAvD_BwE
                        // stringa codice sconto "" mia "" !!
                        // DEFAULT
                        // https://www.tsunaminutrition.it/carrello
                        // STRINGA IN PIU
                        // ?discount=warfit15
                      }));
                    }}
                  />
                </Form.Group>
              )}

              {event.tipoEvento === "exc" && (
                <Form.Group className="mb-3">
                  <Form.Label>A chi è riservato l'evento?</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Es: solo padroni di cani..."
                    onChange={(e) => {
                      setEvent((prevEvent) => ({
                        ...prevEvent,
                        descrizione: `${prevEvent.descrizione || ""} ${
                          e.target.value
                        }`.trim(), // per non sovrascrivere
                      }));
                    }}
                  />
                </Form.Group>
              )}

              {/* ---------------------------------------------------------------- */}

              <Form.Group className="mb-3">
                <Form.Label>Quando sarà l'evento?</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  onChange={(e) => {
                    handleChange(e, "dataEvento");
                  }}
                  value={event.dataEvento}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Luogo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Luogo dell'evento?"
                  required
                  onChange={(e) => {
                    setEvent({
                      ...event,
                      luogo: e.target.value,
                    });
                  }}
                  value={event.luogo}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Autore</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Autore dell'evento"
                  readOnly // Rende il campo non modificabile
                  value={userData.nickname} // Usa il valore ricevuto dalla fetch
                />
              </Form.Group>


              <Form.Group className="mb-3">
            <Form.Label>URL Immagine Profilo Evento</Form.Label>
            <Form.Control
              type="url"
              placeholder="Inserisci l'URL dell'immagine"
              required
              onChange={(e) => {
                setEvent({
                  ...event,
                  fotoEvento: e.target.value,
                });
              }}
              value={event.fotoEvento}
            />
          </Form.Group>

              <Button variant="success" type="submit">
                Invia!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Crea;
