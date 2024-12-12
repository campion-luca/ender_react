import immagine from "../assets/cose.jpg";
import immagine2 from "../assets/come.jpg";
import immagine3 from "../assets/perche.jpg";
import immagine4 from "../assets/perche vero.jpg";
// import MapsTest from "./MapsTest";
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";
import { useState } from "react";

const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Alterna tra "fronte" e "retro"
  };


  return (
    <div className="bg-default-2">
      {/* APERTURA BODY */}

      <h1 className="body-title position-relative">ENDER</h1>

      <Container fluid className="pb-5">
        <Row className="mb-5">
          {/* Prima Colonna */}
          <Col
            md={6}
            className="d-flex justify-content-end align-items-center pe-4"
          >
            <Card
              style={{
                backgroundColor: "#222222",
                border: "none",
                width: "80%",
                cursor: "pointer",
              }}
              onClick={() => setIsFlipped(!isFlipped)}
              className={`custom-card ${isFlipped ? "flipped" : ""}`}
            >
              {!isFlipped ? (
                <div className="card-front">
                  <Card.Img
                    src={immagine}
                    alt="Esempio immagine 1"
                    className="body-img"
                    style={{
                      border: "30px solid #222222", // Bordo nero spesso
                    }}
                  />
                  <Card.Body className="bg-default-2 pt-1 ps-0">
                    <Card.Title className="mb-0">
                      COS'&#x200E;&#x00C8;
                    </Card.Title>
                    <Card.Text className="">
                      Scopri cos'è{" "}
                      <span style={{ textDecoration: "underline" }}>
                        <small>Ender</small>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </div>
              ) : (
                <div className="card-back bg-default-black">
                  <Card.Body className="pt-1 ps-0">
                    <p className="body-text py-5">
                      Ender è un progetto ambizioso che punta ad aiutare gli
                      utenti a scoprire e vivere esperienze indimenticabili in
                      giro per il <b>mondo</b>. Grazie alla nostra piattaforma,
                      potrai trovare eventi adatti ai tuoi interessi, che si
                      tratti di concerti, festival, mostre d’arte, conferenze,
                      flash moab o perchè no, feste "private". Il nostro
                      obiettivo è rendere la ricerca semplice e intuitiva,
                      fornendo informazioni dettagliate su ogni evento: luogo,
                      orari, prezzi e recensioni sull'organizzatore. Ender non
                      si limita a segnalarti gli eventi, vogliamo{" "}
                      <b>ispirarti</b>, guidarti verso esperienze uniche che
                      rendano ogni viaggio o weekend speciale. Con un design
                      moderno e funzionalità avanzate, Ender è il compagno
                      ideale per chi ama esplorare e connettersi con nuove
                      culture, persone e passioni. Ovunque ti trovi, Ender è qui
                      per aiutarti a trasformare ogni giorno in un'avventura
                      straordinaria e a farti immergere in culture ed eventi
                      altrimenti <b>sconosciuti</b>.
                    </p>
                  </Card.Body>
                </div>
              )}
            </Card>
          </Col>

          {/* Seconda Colonna */}
          <Col
            md={6}
            className="d-flex justify-content-left align-items-center pe-4"
          >
            <Card
              style={{
                backgroundColor: "#222222",
                border: "none",
                width: "80%",
              }}
              onClick={() => setIsFlipped2(!isFlipped2)}
              className={`custom-card ${isFlipped ? "flipped" : ""}`}
            >
              {!isFlipped2 ? (
                <div className="card-front">
                  <Card.Img
                    src={immagine3}
                    alt="Esempio immagine 1"
                    className="body-img"
                    style={{
                      border: "30px solid #222222", // Bordo nero spesso
                    }}
                  />
                  <Card.Body className="bg-default-2 pt-1 ps-0">
                    <Card.Title className="mb-0">COME</Card.Title>
                    <Card.Text className="">
                      Come funziona{" "}
                      <span style={{ textDecoration: "underline" }}>
                        <small>Ender</small>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </div>
              ) : (
                <div className="card-back bg-default-black">
                  <Card.Body className="pt-1 ps-0">
                    <p className="body-text py-5">
                      <i>
                        Ender raccoglie informazioni provenienti da una rete
                        diversificata di fonti, tra cui <b>enti comunali</b>,
                        organizzazioni specializzate in eventi, locali come{" "}
                        <b>discoteche</b>, e persino <b>utenti privati</b> che
                        vogliono promuovere le loro feste/eventi. Se sei un
                        ente, un'organizzazione, o semplicemente qualcuno che
                        vuole promuovere eventi privati, Ender ti offre
                        l'opportunità di partecipare attivamente. Basta cliccare
                        sul pulsante <b>"Upgrade"</b> per ottenere la
                        certificazione come creatore di eventi, che ti consente
                        di aggiungere i tuoi eventi al nostro sistema. Questo
                        processo garantisce la <b>qualità e l'affidabilità</b>{" "}
                        delle informazioni condivise con gli utenti, aiutandoti
                        a raggiungere un pubblico più vasto e congruo ai tuoi
                        eventi.
                      </i>
                    </p>
                  </Card.Body>
                </div>
              )}
            </Card>
          </Col>

          {/* Terza Colonna */}
          <Col
            md={6}
            className="d-flex justify-content-end align-items-center pe-4"
          >
            <Card
              style={{
                backgroundColor: "#222222",
                border: "none",
                width: "80%",
              }}
              onClick={() => setIsFlipped3(!isFlipped3)}
              className={`custom-card ${isFlipped ? "flipped" : ""}`}
            >
              {!isFlipped3 ? (
                <div className="card-front">
                  <Card.Img
                    src={immagine2}
                    alt="Esempio immagine 1"
                    className="body-img"
                    style={{
                      border: "30px solid #222222", // Bordo nero spesso
                    }}
                  />
                  <Card.Body className="bg-default-2 pt-1 ps-0">
                    <Card.Title className="mb-0">CHI</Card.Title>
                    <Card.Text className="">
                      Chi siamo noi di{" "}
                      <span style={{ textDecoration: "underline" }}>
                        <small>Ender</small>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </div>
              ) : (
                <div className="card-back bg-default-black">
                  <Card.Body className="pt-1 ps-0">
                    <p className="body-text py-5">
                      Ender è un progetto ambizioso che punta ad aiutare gli
                      utenti a scoprire e vivere esperienze indimenticabili in
                      giro per il <b>mondo</b>. Grazie alla nostra piattaforma,
                      potrai trovare eventi adatti ai tuoi interessi, che si
                      tratti di concerti, festival, mostre d’arte, conferenze,
                      flash moab o perchè no, feste "private". Il nostro
                      obiettivo è rendere la ricerca semplice e intuitiva,
                      fornendo informazioni dettagliate su ogni evento: luogo,
                      orari, prezzi e recensioni sull'organizzatore. Ender non
                      si limita a segnalarti gli eventi, vogliamo{" "}
                      <b>ispirarti</b>, guidarti verso esperienze uniche che
                      rendano ogni viaggio o weekend speciale. Con un design
                      moderno e funzionalità avanzate, Ender è il compagno
                      ideale per chi ama esplorare e connettersi con nuove
                      culture, persone e passioni. Ovunque ti trovi, Ender è qui
                      per aiutarti a trasformare ogni giorno in un'avventura
                      straordinaria e a farti immergere in culture ed eventi
                      altrimenti <b>sconosciuti</b>.
                    </p>
                  </Card.Body>
                </div>
              )}
            </Card>
          </Col>

          {/* Quarta Colonna */}
          <Col
            md={6}
            className="d-flex justify-content-left align-items-center pe-4"
          >
            <Card
              style={{
                backgroundColor: "#222222",
                border: "none",
                width: "80%",
              }}
              onClick={() => setIsFlipped1(!isFlipped1)}
              className={`custom-card ${isFlipped ? "flipped" : ""}`}
            >
              {!isFlipped1 ? (
                <div className="card-front">
                  <Card.Img
                    src={immagine4}
                    alt="Esempio immagine 1"
                    className="body-img"
                    style={{
                      border: "30px solid #222222", // Bordo nero spesso
                    }}
                  />
                  <Card.Body className="bg-default-2 pt-1 ps-0">
                    <Card.Title className="mb-0">
                      PERCH&#x200E;&#x00C8;
                    </Card.Title>
                    <Card.Text className="">
                      Perchè usare{" "}
                      <span style={{ textDecoration: "underline" }}>
                        <small>Ender</small>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </div>
              ) : (
                <div className="card-back bg-default-black">
                  <Card.Body className="pt-1 ps-0">
                    <p className="body-text py-5">
                      <i>
                        Ender punta ad offrire un’esperienza che combina{" "}
                        <b>affidabilità e facilità </b>
                        d’uso. Ogni organizzatore presente sul sito è{" "}
                        <b> verificato e certificato</b>, garantendo la qualità
                        e la sicurezza degli eventi proposti. Ciò assicura agli
                        utenti una selezione di eventi autentici e ben
                        organizzati, senza il rischio di truffe o imprevisti. La
                        nostra missione è mettere al primo posto la{" "}
                        <b>semplicità e l'intuitività</b>, rendendo la ricerca e
                        la gestione degli eventi un processo piacevole e senza
                        stress. Con l’aiuto della comunità, Ender cresce e si
                        evolve costantemente, per adattarsi alle esigenze di chi
                        lo utilizza. Siamo convinti che il contributo di tutti
                        sia
                        <b> fondamentale</b> per costruire una rete dinamica e
                        interconnessa, dove ogni evento può trovare il suo
                        spazio e ogni utente sentirsi parte di un progetto
                        comune. Scegliendo Ender, scegli di far parte di una
                        grande <b>famiglia</b> che condividono interessi comuni
                        ai tuoi.
                      </i>
                    </p>
                  </Card.Body>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
