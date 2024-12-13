import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nome: '',
        cognome: '',
        nickname: '',
        fotoProfilo: '', // Nuovo campo
        role: 'USER' // Nuovo campo
    });


    // controllo se ha già effettuato il login
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
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
                    console.log('Dati utente:', data);
    
                    // Se i dati sono validi, naviga al profilo
                    navigate('/profilo');
                } catch (error) {
                    console.error(error);
                    alert('Errore nel recupero dei dati: ' + error.message);
                }
            };
    
            fetchUserData();
        }
    }, [navigate]);
    // ----------------------------------------------------------



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData, "Riempimento dati da passare")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? 'http://localhost:3001/auth/login'
            : 'http://localhost:3001/auth/register';

        const payload = {
            email: formData.email,
            password: formData.password,
            ...(isLogin ? {} : {
                nome: formData.nome,
                cognome: formData.cognome,
                nickname: formData.nickname,
                fotoProfilo: formData.fotoProfilo, // Nuovo campo
                role: formData.role // Nuovo campo
            }),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l\'autenticazione.');
            }

            const data = await response.json();

            if (isLogin) {
                localStorage.setItem('token', data.accessToken);
                alert('Login riuscito!');
                navigate('/profilo');
            } else {
                alert('Registrazione completata! Ora puoi effettuare il login.');
                setIsLogin(true);
            }
        } catch (error) {
            console.error(error);
            alert('Errore: ' + error.message);
        }
    };

    return (
        <div className="container pt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card login-container">
                    <div className="card-header text-center login-text">
                        <h3>{isLogin ? 'Login' : 'Registrazione'}</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label login-text">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control form-crea"
                                    value={formData.email}
                                    placeholder="Inserisci l'email"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label login-text">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control form-crea"
                                    value={formData.password}
                                    placeholder="Inserisci qui la password"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {!isLogin && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label login-text">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            className="form-control form-crea"
                                            value={formData.nome}
                                            placeholder="Inserisci il nome"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cognome" className="form-label login-text">
                                            Cognome
                                        </label>
                                        <input
                                            type="text"
                                            id="cognome"
                                            name="cognome"
                                            className="form-control form-crea"
                                            value={formData.cognome}
                                            placeholder="Inserisci il cognome"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nickname" className="form-label login-text">
                                            Nickname
                                        </label>
                                        <input
                                            type="text"
                                            id="nickname"
                                            name="nickname"
                                            className="form-control form-crea"
                                            value={formData.nickname}
                                            placeholder="Inserisci il nickname"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fotoProfilo" className="form-label login-text">
                                            URL Foto Profilo
                                        </label>
                                        <input
                                            type="url"
                                            id="fotoProfilo"
                                            name="fotoProfilo"
                                            className="form-control form-crea"
                                            value={formData.fotoProfilo}
                                            onChange={handleInputChange}
                                            placeholder="Inserisci URL immagine"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            <button type="submit" className="btn button-crea w-100">
                                {isLogin ? 'Accedi' : 'Registrati'}
                            </button>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <button
                            type="button"
                            className="btn login-link"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin
                                ? 'Non hai un account? Registrati'
                                : 'Hai già un account? Accedi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Login;
