// db/database.js
const sqlite3 = require("sqlite3").verbose();

// Create or connect to SQLite database
const db = new sqlite3.Database("./data.db");

// Create tables if they don’t exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    lesson TEXT,
    score INTEGER
  )`);
});

module.exports = db;
