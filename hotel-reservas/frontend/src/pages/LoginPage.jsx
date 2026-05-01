import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/auth/login', { email, password })
      .then(res => {
        localStorage.setItem('hotel_token', res.data.token);
        localStorage.setItem('hotel_user', JSON.stringify(res.data.user));
        navigate('/');
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Error de autenticación');
      });
  };

  return (
    <div className="container" style={{ padding: '60px 0', maxWidth: '400px' }}>
      <h2>Iniciar Sesión</h2>
      <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }}>
        {error && <p style={{ color: 'var(--color-text-error)' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
          </div>
          <button type="submit" className="btnPrimary" style={{ width: '100%' }}>Ingresar</button>
        </form>
        <p style={{ fontSize: '0.85rem', marginTop: '16px', color: 'var(--color-text-secondary)' }}>
          Tip: Usa juan@email.com / cualquier pass
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
