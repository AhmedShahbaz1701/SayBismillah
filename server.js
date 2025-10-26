const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const COUNTER_FILE = path.join(__dirname, 'counter.json');

// Initialize counter file if it doesn't exist
if (!fs.existsSync(COUNTER_FILE)) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
}

app.use(express.static(__dirname));

app.get('/api/visitors', (req, res) => {
  const data = JSON.parse(fs.readFileSync(COUNTER_FILE));
  data.count += 1;
  fs.writeFileSync(COUNTER_FILE, JSON.stringify(data));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
