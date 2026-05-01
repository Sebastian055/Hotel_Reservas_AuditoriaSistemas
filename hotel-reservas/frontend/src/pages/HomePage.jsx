import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://placehold.co/1200x500/1a3c5e/FFF?text=HotelVista+Luxury")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>Bienvenido a HotelVista</h1>
        <p style={{ fontSize: '20px', marginBottom: '30px' }}>Donde el lujo y la comodidad se encuentran</p>
        <button className="btnPrimary" onClick={() => navigate('/rooms')}>Ver habitaciones</button>
      </div>

      <div className="container" style={{ padding: '60px 20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '10px', textAlign: 'center', boxShadow: 'var(--shadow-card)'}}>
          <h3>Ubicación</h3>
          <p>En el corazón de la ciudad, cerca de todo lo que necesitas.</p>
        </div>
        <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '10px', textAlign: 'center', boxShadow: 'var(--shadow-card)'}}>
          <h3>Servicios</h3>
          <p>Spa, gimnasio, piscina y restaurantes de clase mundial a tu disposición.</p>
        </div>
        <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '10px', textAlign: 'center', boxShadow: 'var(--shadow-card)'}}>
          <h3>Experiencia</h3>
          <p>Atención personalizada para que tu estancia sea inolvidable.</p>
        </div>
      </div>
      
      <footer style={{ background: '#1c1c1e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <p>Contacto: info@hotelvista.com | +1 234 567 890</p>
      </footer>
    </div>
  );
};

export default HomePage;
