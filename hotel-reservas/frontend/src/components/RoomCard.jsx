import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoomCard.module.css';
import StatusBadge from './StatusBadge';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img src={room.image_url} alt={room.name} className={styles.roomImage} />
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3>{room.name}</h3>
          <StatusBadge status={room.is_active ? 'available' : 'unavailable'} />
        </div>
        <p className={styles.type}>Tipo: {room.type}</p>
        <p className={styles.price}>${room.price_per_night} / noche</p>
        <div className={styles.features}>
          <span>Capacidad: {room.capacity}</span>
        </div>
        { }
        <button
          className="btnDanger"
          style={{ width: '100%', marginTop: 'var(--space-md)' }}
          onClick={() => navigate(`/rooms/${room.id}/reserve`)}
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
