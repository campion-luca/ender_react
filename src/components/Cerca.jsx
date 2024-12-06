import { useEffect, useState } from "react"
import { Container, Row, Col, Spinner, Alert, Card, ListGroup } from 'react-bootstrap'


const Cerca = () => {

    const [event, setEvent] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)


    useEffect(() => {
        fetchEvent()
    }, [])


    const fetchEvent = () => {
        fetch('http://localhost:3001/eventi')
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('La chiamata non è andata a buon fine!')
            }
        })
        .then((arrayOfEvent) => {
            console.log('Array recuperato' , arrayOfEvent)
            setEvent(arrayOfEvent.content)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log('Errore nel recupero dei dati', err)
            setIsLoading(false)
            setIsError(true)
        })
    }

    return (
        
<Container>
      <Row className="justify-content-center my-4">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-3">Prenotazioni esistenti</h2>
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
                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Immagine evento" />
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
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
    )
}

export default Cerca