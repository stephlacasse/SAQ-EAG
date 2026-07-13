import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';
import logo from '../media/logo_saq.png';
import { signOut } from 'aws-amplify/auth';
import { useCentres } from '../contexts/CentresContext';
import { IoCallOutline } from "react-icons/io5";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();
    const { centres } = useCentres();

    return (
        <nav className="sidebar">
            <div className='nav-top-section'>
                <img 
                    src={logo} 
                    alt="Levio Logo" 
                    className="logo"
                    onClick={() => navigate('/')}
                />
                <ul className="nav-links">
                    <li className='centre-title'>
                        <Link 
                            to="/" 
                            style={{ display: "flex", alignItems: "end" }}
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            <IoCallOutline style={{ marginRight: '10px', height: '50px', width: '50px' }} className='centre-icon'/>
                            <div style={{ fontSize: '20px', color:'white' }}>
                                Centres de Contact
                            </div>
                        </Link>
                    </li>
                    
                    {centres.map((centre, index) => (
                        <li key={index} className='centre-link'>
                            <Link 
                                to={`/centre/${centre.nom}`}  // Use `nom` instead of `Key`
                                className={location.pathname === `/centre/${centre.nom}` ? 'active' : ''}
                            >
                                {centre.nom}  {/* Display the center name */}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='nav-buttons'>
                <button className="nav-button theme-toggle" onClick={toggleTheme}>
                    Toggle Theme
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
