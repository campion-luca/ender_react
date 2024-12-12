import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com'; // Import EmailJS

const Upgrade = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      attachment: e.target.files[0], // Salva solo il primo file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('attachment', formData.attachment);

    // Invia l'email tramite EmailJS
    emailjs
      .sendForm(
        'service_id', // Sostituisci con il tuo service_id
        'template_id', // Sostituisci con il tuo template_id
        formDataToSend,
        'user_id' // Sostituisci con il tuo user_id
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Email inviata con successo!');
        },
        (error) => {
          console.log(error.text);
          alert('C\'è stato un errore nell\'invio dell\'email.');
        }
      );
  };

  return (

    <div className='upgrade-sfondo'>
    <h2 className="text-center mb-3 body-title">Upgrade</h2>

    <Container className='upgrade-form'>
      <Row>
        <Col>
          <p className="upgrade-text">
            Ender si basa anche e principalmente sulla community, che gioca un
            ruolo fondamentale nell'inviare e creare eventi, diventando così parte
            attiva del progetto e contribuendo allo sviluppo della zona. Tuttavia, non
            tutti possono diventare Organizzatori. Per poter far parte di questo ruolo,
            è necessario inviare una copia della propria carta d'identità, insieme a nome,
            cognome, indirizzo e altre informazioni richieste, all'email
            campionluca3@gmail.com. Questo processo ci permette di garantire la serietà
            e l'affidabilità di chi si impegna in questo ruolo.
          </p>
        </Col>

        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className='upgrade-label'>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className='form-crea'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className='upgrade-label'>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className='form-crea'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label className='upgrade-label'>Messaggio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Scrivi il tuo messaggio"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className='form-crea'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAttachment">
              <Form.Label className='upgrade-label'>Allega la tua carta d'identità</Form.Label>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleFileChange}
                required
                className='form-crea'
              />
            </Form.Group>

            <Button className='button-crea' type="submit">
              Invia
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

    </div>
  );
};

export default Upgrade;
