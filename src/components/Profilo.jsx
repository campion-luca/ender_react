import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nome: '',
        cognome: '',
        nickname: '',
        email: '',
        fotoProfilo: '',
        password: '',
        role: 'USER',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3001/utenti/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Impossibile recuperare i dati dell\'utente');
                }

                const data = await response.json();
                console.log('dati ricevuti pt.2', data)
                setUserData(data);
                
            } catch (error) {
                console.error(error);
                alert('Errore nel recupero dei dati: ' + error.message);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

        // Funzione per il logout
        const handleLogout = () => {
            console.log("funziona Luca")
            localStorage.removeItem('token');
            navigate('/login');
            window.location.reload();
        }
        // ----------------------------------------------------------

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // CHECK TOKEN
        console.log('TOKEN ????', token)

        try {
            const response = await fetch('http://localhost:3001/utenti/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            // CHECK DATI PASSATI
            console.log(userData)

            if (!response.ok) {
                throw new Error('Errore durante l\'aggiornamento dei dati');
            }

            const updatedData = await response.json();
            setUserData(updatedData);
            setIsEditing(false);
            // alert('Dati aggiornati con successo!');

        } catch (error) {
            console.error(error);
            alert('Errore: ' + error.message);
        }
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Profilo</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <img
                                    src={userData.fotoProfilo || 'https://via.placeholder.com/150'}
                                    alt="Foto Profilo"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px' }}
                                />
                            </div>

                            {/* NOME */}
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        className="form-control"
                                        value={userData.nome}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    <p>{userData.nome}</p>
                                )}
                            </div>

                            {/* COGNOME */}
                            <div className="mb-3">
                                <label htmlFor="cognome" className="form-label">Cognome</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        id="cognome"
                                        name="cognome"
                                        className="form-control"
                                        value={userData.cognome}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    <p>{userData.cognome}</p>
                                )}
                            </div>

                            {/* NICKNAME */}
                            <div className="mb-3">
                                <label htmlFor="nickname" className="form-label">Nickname</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        id="nickname"
                                        name="nickname"
                                        className="form-control"
                                        value={userData.nickname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                ) : (
                                    <p>{userData.nickname}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <p>{userData.email}</p>
                            </div>

                            <div className="text-center">
                                {isEditing ? (
                                    <button type="button" className="btn btn-success me-2" onClick={handleUpdate}>
                                        Salva
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleEditToggle}>
                                        Modifica
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Profile;