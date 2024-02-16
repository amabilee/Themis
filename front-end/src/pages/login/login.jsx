import React, { useState, useEffect } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../hooks/index';


export default function Login() {
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(' ');
    const {signIn, error, loading, auth} = UseAuth()

    function handleLogin() {
        signIn(username, pwd)
        console.log('enviou')
    }

    useEffect(() => { //função de intervalo
        setTimeout(() => {
            setShowLogin(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if(auth){
            navigate('/client')
            setErrorMessage('')
        } else {
            setErrorMessage('')
        }
    }, [auth, error])
    return (
        <>
            <div className="body">
                <div className={`loadingPage ${showLogin ? 'loadingSectionSmall' : ''}`}>
                    <div className={`logo-img ${showLogin ? 'loadingSectionSmall' : ''}`}></div>
                    <div className={`loading ${showLogin ? 'loadingSectionSmall' : ''}`}></div>
                </div>
                {showLogin && (
                    <div className="loginSection">
                        <div className="loadingSection">
                            <div className="logo-img"></div>
                        </div>
                        <Card>
                            <Card.Body>
                                <div className="cardLogin">
                                    <h1 className='heading-3 text-color-1 text-align-center margin-bottom-10'>Login</h1>
                                    <span className='body-normal text-color-5 margin-bottom-10'>Usuário</span>
                                    <input
                                        className='form-1'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <span className='body-normal text-color-5 margin-bottom-10'>Senha</span>
                                    <input
                                        className='form-1'
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                    />
                                    <div className='errorContainer' style={{ position: 'relative', zIndex: 1 }}>
                                        {error && (
                                            <p className="error-message-login" style={{ position: 'absolute', top: 0, left: 0 }}>
                                                {error}
                                            </p>
                                        )}
                                        <button className='button-1' onClick={handleLogin}>Acessar</button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <p className="versionText body-normal text-color-6">Thêmis v.1.0</p>
                        <div className="logo-uni"></div>
                    </div>
                )}
            </div>
            <div className="blocker"></div>
        </>
    );
}
