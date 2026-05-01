const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, (req, res) => {
  const { room_id, guest_name, guest_email, check_in_date, check_out_date, guests_count } = req.body;
  const user_id = req.user.id;

  const room = db.prepare('SELECT * FROM rooms WHERE id = ?').get(room_id);
  if (!room) {
    return res.status(404).json({ error: true, message: 'Habitación no encontrada.' });
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const checkIn = new Date(check_in_date);
  const checkOut = new Date(check_out_date);
  const nights = Math.floor((checkOut - checkIn) / msPerDay);

  const totalPrice = nights * parseFloat(room.price_per_night);

  const stmt = db.prepare(`
    INSERT INTO reservations (room_id, user_id, guest_name, guest_email, check_in_date, check_out_date, guests_count, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(room_id, user_id, guest_name, guest_email, check_in_date, check_out_date, guests_count || 1, totalPrice);

  res.json({ success: true, message: 'Reserva confirmada', id: result.lastInsertRowid });
});

router.get('/my', authMiddleware, (req, res) => {
  const reservations = db.prepare(`
    SELECT r.*, ro.name as room_name, ro.image_url as room_image
    FROM reservations r
    JOIN rooms ro ON r.room_id = ro.id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC
  `).all(req.user.id);

  res.json(reservations);
});

router.get('/search', authMiddleware, (req, res) => {
  const { name } = req.query;
  const query = `SELECT * FROM reservations WHERE guest_name LIKE '%${name}%'`;
  const results = db.prepare(query).all();
  res.json(results);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const stmt = db.prepare('UPDATE reservations SET status=? WHERE id=?');
  stmt.run('cancelled', req.params.id);
  res.json({ success: true, message: 'Reserva cancelada' });
});

router.patch('/:id', authMiddleware, (req, res) => {
  const stmt = db.prepare('UPDATE reservations SET status=? WHERE id=?');
  stmt.run(req.body.status, req.params.id);

  res.json({ success: true, message: 'Reserva actualizada' });
});

module.exports = router;
