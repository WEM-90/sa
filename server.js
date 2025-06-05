
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());

app.get('/get-count', (req, res) => {
  db.get("SELECT count FROM visitors WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ count: row.count });
  });
});

app.post('/increment', (req, res) => {
  db.run("UPDATE visitors SET count = count + 1 WHERE id = 1", function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT count FROM visitors WHERE id = 1", (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ count: row.count });
    });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
