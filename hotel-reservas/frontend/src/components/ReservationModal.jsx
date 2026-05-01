import React from 'react';
import styles from './ReservationModal.module.css';
import { useNavigate } from 'react-router-dom';

const ReservationModal = ({ isOpen, onClose, reservationId }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();

    navigate('/my-reservations');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>¡Reserva Confirmada!</h2>
        <p>Tu número de confirmación es: <strong>#{reservationId}</strong></p>
        <p>Te esperamos para vivir una experiencia inolvidable.</p>
        <button className="btnPrimary" onClick={handleClose}>
          Ver mis reservas
        </button>
      </div>
    </div>
  );
};

export default ReservationModal;
