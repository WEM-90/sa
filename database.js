
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./visitors.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS visitors (id INTEGER PRIMARY KEY, count INTEGER)");
  db.get("SELECT count FROM visitors WHERE id = 1", (err, row) => {
    if (!row) {
      db.run("INSERT INTO visitors (id, count) VALUES (1, 0)");
    }
  });
});

module.exports = db;
