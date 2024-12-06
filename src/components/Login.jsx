import React, { useState } from 'react';
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
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const url = isLogin
            ? 'http://localhost:3001/auth/login'
            : 'http://localhost:3001/auth/register';

        const payload = {
            email: formData.email,
            password: formData.password,
            nome: formData.nome,
            cognome: formData.cognome,
            nickname: formData.nickname,
        };

        try {
            // console.log('Payload:', payload);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l\'autenticazione.');
            }

            const data = await response.json();
            console.log('Response data:', data);

                localStorage.setItem('token', data.accessToken);

                console.log("local storage contenente ->", localStorage.getItem);

                alert('Autenticazione riuscita!');
                console.log('Operazione riuscita, reindirizzamento in corso..')
                navigate('/profilo')

                // -------- PARTE BUG DEL CODICE --------
        //     if (data.token) {
        //     }

        } catch (error) {
            console.error(error);
            alert('Errore: ' + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h3>{isLogin ? 'Login' : 'Registrazione'}</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Campi aggiuntivi per la registrazione */}
                                {!isLogin && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="nome" className="form-label">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                id="nome"
                                                name="nome"
                                                className="form-control"
                                                value={formData.nome}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cognome" className="form-label">
                                                Cognome
                                            </label>
                                            <input
                                                type="text"
                                                id="cognome"
                                                name="cognome"
                                                className="form-control"
                                                value={formData.cognome}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="nickname" className="form-label">
                                                Nickname
                                            </label>
                                            <input
                                                type="text"
                                                id="nickname"
                                                name="nickname"
                                                className="form-control"
                                                value={formData.nickname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <button type="submit" className="btn btn-primary w-100">
                                    {isLogin ? 'Accedi' : 'Registrati'}
                                </button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <button
                                type="button"
                                className="btn btn-link"
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