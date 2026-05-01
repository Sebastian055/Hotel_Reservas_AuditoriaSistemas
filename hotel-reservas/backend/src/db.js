const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', '..', 'hotel.db');
const schemaPath = path.join(__dirname, 'database', 'schema.sql');
const seedPath = path.join(__dirname, 'database', 'seed.sql');

// Conectar o crear BBDD
const db = new Database(dbPath);

// Inicializar si está vacía
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();

if (!tables) {
  console.log('Inicializando base de datos...');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  
  const seed = fs.readFileSync(seedPath, 'utf8');
  db.exec(seed);
  console.log('Base de datos lista.');
}

module.exports = db;
