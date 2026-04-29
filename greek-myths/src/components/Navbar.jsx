import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'All', path: '/' },
    { name: 'Gods', path: '/gods' },
    { name: 'Heroes', path: '/heroes' },
    { name: 'Monsters', path: '/monsters' },
    { name: 'Titans', path: '/titans' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Greek Mythos</Link>
      </div>
      
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link 
              to={link.path} 
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;