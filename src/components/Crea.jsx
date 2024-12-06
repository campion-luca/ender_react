import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

const Crea = () => {

    // DOVREMO SALVARLO QUI IL TOKEN
    const token = localStorage.getItem('token')
    const [event, setEvent] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        dataEvento: '',
        luogo: '',
        autore: '',
        })


    const handleChange = (e, property) => {
        setEvent({
            ...event,
            [property]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(localStorage.getItem('token'));
        fetch('http://localhost:3001/eventi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(event),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Evento salvato!')
                // MODIFICA ANCHE QUESTO
                alert('salvato, modificami')

                setEvent({
                    nome: '',
                    descrizione: '',
                    prezzo: '',
                    dataEvento: '',
                    luogo: '',
                    autore: '',
                })
            } else {
                // MODIFICA
                alert('Riprova più tardi, modificami')
                throw new Error('errore!')
            }
        })
        .catch((err) => {
            alert(err)
        })
    }


    return(
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-3">Crea il tuo evento!</h2>

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
                  })
                }}
                value={event.nome}
              />
            </Form.Group>

            {/* {event.name.length < 3 ? (
              <></>
            ) : event.name !== 'Stefano' ? (
              <Alert variant="danger">Non hai indovinato il nome!</Alert>
            ) : (
              <Alert variant="success">Hai indovinato il nome!</Alert>
            )} */}

            <Form.Group className="mb-3">
              <Form.Label>descrizione</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci una descrizione dell'evento"
                required
                onChange={(e) => {
                  handleChange(e, 'descrizione')
                }}
                value={event.descrizione}
              />

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci una prezzo"
                required
                onChange={(e) => {
                  handleChange(e, 'prezzo')
                }}
                value={event.prezzo}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quando sarà l'evento?</Form.Label>
              <Form.Control
                type="datetime-local"
                required
                onChange={(e) => {
                  handleChange(e, 'dataEvento')
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
                  })
                }}
                value={event.luogo}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                placeholder="Luogo dell'evento?"
                required
                onChange={(e) => {

                  setEvent({
                    ...event,
                    autore: e.target.value,
                  })
                }}
                value={event.autore}
              />
            </Form.Group>

{/* L'autore sarebbe meglio se si caricasse in "automatico" */}

            {/* <Form.Group className="mb-3">
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome dell'evento?"
                required
                onChange={(e) => {
                  console.log('scritto qualcosa in name!', e.target.value)

                  setEvent({
                    ...event,
                    nome: e.target.value,
                  })
                }}
                value={event.nome}
              />
            </Form.Group> */}


            <Button variant="success" type="submit">
              Invia!
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    );
}

export default Crea