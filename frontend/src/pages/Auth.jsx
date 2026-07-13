import React, { useEffect } from 'react';
import './Auth.css';
import logo from '../media/logo_saq.png';
import { useNavigate } from 'react-router-dom';
import { signInWithRedirect } from 'aws-amplify/auth';
import { useAuth } from '../contexts/AuthContext';
 
const Auth = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const provider = { custom: 'Azure' };
 
    useEffect(() => {
        if (user) {
            navigate("/");
        } else {
            signInWithRedirect({ provider });
        }
    }, [user, navigate]);
 
    return (
        <div className="auth-box">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>Portail EAG</h1>
                <p>Redirecting to login...</p>
            </div>
        </div>
    );
};
 
export default Auth;