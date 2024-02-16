import { AuthContext } from "./authContext";
import React, { useState, useEffect } from 'react'
// import { server } from "../services"; API

export const AuthProvider = ({ children }) => {


    let storedUser;
    const storedAuth = localStorage.getItem('auth') === 'true';

    const [user, setUser] = useState(storedUser);
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(storedAuth);
    const [loading, setLoading] = useState(null);

    const userData = {
        user: 'login',
        senha: '123'
    }

    useEffect(() => {
        localStorage.setItem('auth', String(auth));
    }, [user, auth, storedAuth]);

    async function signIn(user, pwd) {
        if (user === userData.user && pwd === userData.senha) {
            localStorage.setItem('user', 'logged');
            setAuth(true)
            setError('')
        }  else {
            localStorage.setItem('user', 'none');
            setAuth(false)
            setError('Credenciais inválidas')
        }
    }




function signOut() {
    setUser('');
    setAuth(false);
    localStorage.removeItem('user');
    localStorage.removeItem('auth1');
    localStorage.removeItem('auth2');
    localStorage.removeItem('auth3');
}
return (
    <AuthContext.Provider value={{ user, auth, error, loading, signIn, signOut }}>
        {children}
    </AuthContext.Provider>
)
}