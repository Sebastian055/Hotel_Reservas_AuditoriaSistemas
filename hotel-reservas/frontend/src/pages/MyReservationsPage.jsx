import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('hotel_token')) {
      navigate('/login');
      return;
    }
    fetchReservations();
  }, [navigate]);

  const fetchReservations = () => {
    api.get('/reservations/my')
      .then(res => setReservations(res.data))
      .catch(console.error);
  };

  const handleCancel = (id) => {
    if (window.confirm('¿Seguro que deseas cancelar esta reserva?')) {
      api.delete(`/reservations/${id}`)
        .then(() => fetchReservations())
        .catch(console.error);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2>Mis Reservas</h2>
      {reservations.length === 0 ? <p>No tienes reservas activas.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: 'var(--color-primary)', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Habitación</th>
              <th style={{ padding: '12px' }}>Check In</th>
              <th style={{ padding: '12px' }}>Check Out</th>
              <th style={{ padding: '12px' }}>Total</th>
              <th style={{ padding: '12px' }}>Estado</th>
              <th style={{ padding: '12px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px' }}>{res.room_name}</td>
                <td style={{ padding: '12px' }}>{res.check_in_date}</td>
                <td style={{ padding: '12px' }}>{res.check_out_date}</td>
                <td style={{ padding: '12px' }}>${parseFloat(res.total_price).toFixed(2)}</td>
                <td style={{ padding: '12px', textTransform: 'uppercase' }}>{res.status}</td>
                <td style={{ padding: '12px' }}>
                  {res.status === 'confirmed' && (
                    <button className="btnDanger" onClick={() => handleCancel(res.id)}>
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReservationsPage;
