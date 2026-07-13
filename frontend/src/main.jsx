import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Centre from './pages/Centre';
import CentreManager from './pages/CentreManager';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { CentresProvider } from './contexts/CentresContext';
import { AuthProvider } from './contexts/AuthContext';
import awsConfig from './auth/cognito';
import { Amplify } from 'aws-amplify';
import PrivateRoute from './auth/PrivateRoute';
Amplify.configure(awsConfig);

// Create a layout component that includes the Navbar
const Layout = () => {
    return (
        <div className='layout'>
            <Navbar />
            <Routes>
                <Route path="/" element={<CentreManager />} />
                <Route path="/centre/:centerId" element={<Centre />} />
            </Routes>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <CentresProvider>
                    <Router>
                        <Routes>
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/*" element={
                                <PrivateRoute>
                                    <Layout />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </Router>
                </CentresProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
