const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'hotel_vista_secret_key_123';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: true, message: 'Acceso denegado. Token no provisto.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: true, message: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;
