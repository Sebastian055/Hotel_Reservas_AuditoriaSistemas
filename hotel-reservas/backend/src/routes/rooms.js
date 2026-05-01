const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {

  const rooms = db.prepare('SELECT * FROM rooms ORDER BY price_per_night ASC').all();

  const result = rooms.map(room => ({
    ...room,
    amenities: db.prepare('SELECT * FROM amenities WHERE room_id=?').all(room.id)
  }));

  res.json(result);
});

router.get('/:id', (req, res) => {
  const room = db.prepare('SELECT * FROM rooms WHERE id=?').get(req.params.id);

  if (!room) {
    return res.status(404).json({ error: true, message: 'Habitación no encontrada.' });
  }

  const amenities = db.prepare('SELECT * FROM amenities WHERE room_id=?').all(room.id);

  res.json({ ...room, amenities });
});

module.exports = router;
