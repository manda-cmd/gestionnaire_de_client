import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📋</span>
          Gestion Clients
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Ajouter" className={`nav-link ${isActive('/Ajouter')}`}>
              Ajouter Client
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
