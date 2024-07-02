//components/NavBar.js

import '../index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
    const { logout } = useLogout(); // Custom hook for logout functionality
    const { user } = useAuthContext(); // Custom hook to get the current user

    const handleClick = () => {
        logout(); // Log out the user on button click
    };

    return (
        <header>
            <div className='container-head'>
                <Link to="/">
                    <p>Return to Home Page</p>
                </Link>
                <nav>
                    {user && (
                        <div>
                            {/* Links for authenticated users */}
                            <Link to="/patients">Patients</Link>
                            <Link to="/appointments">Doc Appointments</Link>
                            <button onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div className='log-link'>
                            {/* Links for unauthenticated users */}
                            <Link to="/patients">Patients</Link>
                            <Link to="/appointments">Appointments</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
