import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RoomCard from '../components/RoomCard';
import styles from '../components/RoomCard.module.css';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2>Nuestras Habitaciones</h2>
      <div className={styles.roomsGrid}>
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
