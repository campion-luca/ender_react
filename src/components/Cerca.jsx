import { useEffect, useState } from "react"
import { Container, Row, Col, ListGroup, Spinner, Alert } from 'react-bootstrap'


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
          <Col xs={12} md={6}>
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
            <ListGroup>
              {!isLoading && !isError && event.length === 0 ? (
                <ListGroup.Item>
                  Al momento non è presente nessuna prenotazione :(
                </ListGroup.Item>
              ) : (
                event.map((res) => {
                  return (
                    <ListGroup.Item key={res.id}>
                      {res.nomeEvento} per {res.descrizione}
                    </ListGroup.Item>
                  )
                })
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>

    )
}

export default Cerca