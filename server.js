
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.static('.'));
app.use(express.json());

app.post('/increment', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS counter (id SERIAL PRIMARY KEY, count INT)');
    const result = await pool.query('SELECT count FROM counter WHERE id = 1');
    if (result.rowCount === 0) {
      await pool.query('INSERT INTO counter (id, count) VALUES (1, 1)');
    } else {
      await pool.query('UPDATE counter SET count = count + 1 WHERE id = 1');
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/get-count', async (req, res) => {
  try {
    const result = await pool.query('SELECT count FROM counter WHERE id = 1');
    const count = result.rowCount > 0 ? result.rows[0].count : 0;
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
