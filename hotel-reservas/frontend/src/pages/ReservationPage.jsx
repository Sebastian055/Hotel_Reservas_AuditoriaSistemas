import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import DateRangePicker from '../components/DateRangePicker';
import ReservationModal from '../components/ReservationModal';

const ReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [reservationId, setReservationId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('hotel_token')) {
      navigate('/login');
    } else {
      api.get(`/rooms/${id}`).then(res => setRoom(res.data)).catch(console.error);
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');

    api.post('/reservations', {
      room_id: id,
      guest_name: guestName,
      guest_email: guestEmail,
      check_in_date: checkIn,
      check_out_date: checkOut,
      guests_count: guestsCount
    }).then(res => {
      setReservationId(res.data.id);
      setModalOpen(true);

    }).catch(err => {
      setError(err.response?.data?.message || 'Error al reservar');
    });
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !room) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.floor((new Date(checkOut) - new Date(checkIn)) / msPerDay);
    if (nights <= 0) return 0;
    return nights * parseFloat(room.price_per_night);
  };

  if (!room) return <div className="container">Cargando...</div>;

  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '600px' }}>
      <h2>Reservar {room.name}</h2>
      <p>Precio por noche: <strong>${room.price_per_night}</strong></p>

      {error && <div style={{ color: '#ffffff', backgroundColor: '#e74c3c', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
        <span style={{ color: '#ffffff' }}>{error}</span>
      </div>}

      <form onSubmit={handleSubmit} style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ marginBottom: '16px' }}>
          <label>Nombre del huésped</label>
          <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Email de contacto</label>
          <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <DateRangePicker
            checkIn={checkIn} checkOut={checkOut}
            onChange={(type, val) => type === 'checkIn' ? setCheckIn(val) : setCheckOut(val)}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label>Número de huéspedes</label>
          <input type="number" min="1" max={room.capacity} value={guestsCount} onChange={e => setGuestsCount(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ padding: '16px', background: 'var(--color-bg)', marginBottom: '24px', borderRadius: '4px' }}>
          <h3>Total estimado: ${calculateTotal().toFixed(2)}</h3>
        </div>

        <button type="submit" className="btnPrimary" style={{ width: '100%' }}>Confirmar reserva</button>
      </form>

      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} reservationId={reservationId} />
    </div>
  );
};

export default ReservationPage;
