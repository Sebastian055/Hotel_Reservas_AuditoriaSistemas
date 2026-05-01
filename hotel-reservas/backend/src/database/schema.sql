CREATE TABLE rooms (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  type            TEXT NOT NULL CHECK(type IN ('single','double','suite','presidential')),
  price_per_night VARCHAR(20) NOT NULL,      
  capacity        INTEGER NOT NULL DEFAULT 2,
  description     TEXT,
  image_url       TEXT,
  is_active       INTEGER NOT NULL DEFAULT 1  
);

CREATE TABLE amenities (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,                  
  name    TEXT NOT NULL
);

CREATE TABLE users (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL,
  email        TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'guest' CHECK(role IN ('guest','admin'))
);

CREATE TABLE reservations (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id        INTEGER NOT NULL,         
  user_id        INTEGER NOT NULL,
  guest_name     TEXT NOT NULL,
  guest_email    TEXT NOT NULL,
  check_in_date  TEXT NOT NULL,           
  check_out_date TEXT NOT NULL,
  guests_count   INTEGER NOT NULL DEFAULT 1,
  total_price    TEXT,                    
  status         TEXT NOT NULL DEFAULT 'confirmed'
                   CHECK(status IN ('confirmed','cancelled','completed')),
  created_at     TEXT DEFAULT (datetime('now'))
);
