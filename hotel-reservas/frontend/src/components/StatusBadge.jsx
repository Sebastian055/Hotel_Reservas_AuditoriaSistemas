import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ status }) => {
  const isAvailable = status === 'available';
  return (
    <span className={`${styles.badge} ${isAvailable ? styles.available : styles.unavailable}`}>
      {isAvailable ? 'Disponible' : 'No Disponible'}
    </span>
  );
};

export default StatusBadge;
