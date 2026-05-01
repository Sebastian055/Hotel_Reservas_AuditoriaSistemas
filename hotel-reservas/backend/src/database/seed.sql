INSERT INTO rooms (name, type, price_per_night, capacity, description, image_url, is_active) VALUES
  ('Habitación Estándar 101', 'single',       '89.99',  1, 'Cómoda habitación individual con vista al jardín.', '/images/room-single.jpg',        1),
  ('Suite Doble Deluxe 202',  'double',       '149.99', 2, 'Amplia suite con cama king y sala de estar.',        '/images/room-double.jpg',        1),
  ('Suite Ejecutiva 301',     'suite',        '249.99', 2, 'Suite de lujo con jacuzzi y vistas panorámicas.',   '/images/room-suite.jpg',         1),
  ('Suite Presidencial 401',  'presidential', '499.99', 4, 'El máximo en lujo. Dos plantas, terraza privada.',  '/images/room-presidential.jpg',  1),
  ('Habitación Clásica 102',  'single',       '79.99',  1, 'Habitación en renovación. No disponible.',          '/images/room-single.jpg',        0);


INSERT INTO amenities (room_id, name) VALUES
  (1,'WiFi'),(1,'TV'),(1,'Aire acondicionado'),
  (2,'WiFi'),(2,'TV'),(2,'Minibar'),(2,'Bañera'),
  (3,'WiFi'),(3,'TV'),(3,'Minibar'),(3,'Jacuzzi'),(3,'Vista panorámica'),
  (4,'WiFi'),(4,'TV'),(4,'Minibar'),(4,'Jacuzzi'),(4,'Terraza privada'),(4,'Mayordomía 24h');

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin Hotel', 'admin@hotelvista.com', 'dummy_hash', 'admin'),
  ('Juan Pérez',  'juan@email.com',       'dummy_hash', 'guest'),
  ('Ana Gómez',   'ana@email.com',        'dummy_hash', 'guest');
