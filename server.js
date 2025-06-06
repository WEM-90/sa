const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const connectionString = 'postgresql://sa_visitors_db_user:HhS6xtTloY6nelDm3AakcZgQYV16SwQM@dpg-d112mth5pdvs73ehrjmg-a/sa_visitors_db';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(cors());

app.get('/get-count', async (req, res) => {
  try {
    const result = await pool.query("SELECT count FROM visitors WHERE id = 1");
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/increment', async (req, res) => {
  try {
    await pool.query("UPDATE visitors SET count = count + 1 WHERE id = 1");
    const result = await pool.query("SELECT count FROM visitors WHERE id = 1");
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});