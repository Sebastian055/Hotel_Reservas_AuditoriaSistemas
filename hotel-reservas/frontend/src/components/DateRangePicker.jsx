import React from 'react';

const DateRangePicker = ({ checkIn, checkOut, onChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>Check-in</label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => onChange('checkIn', e.target.value)}
          style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => onChange('checkOut', e.target.value)}
          style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
