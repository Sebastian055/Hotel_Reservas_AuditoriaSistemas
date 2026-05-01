import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('hotel_token');

  const handleLogout = () => {
    localStorage.removeItem('hotel_token');
    localStorage.removeItem('hotel_user');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContent}`}>
        <div className={styles.brand}>HotelVista</div>
        <div className={styles.links}>
          <NavLink to="/" className={styles.navLink}>Inicio</NavLink>
          <NavLink to="/rooms" className={styles.navLink}>Habitaciones</NavLink>
          {token ? (
            <>
              <NavLink to="/my-reservations" className={styles.navLink}>Mis Reservas</NavLink>
              <button className={styles.btnOutlined} onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <NavLink to="/login" className={styles.btnOutlined}>Iniciar Sesión</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
