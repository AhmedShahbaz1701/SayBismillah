const express = require('express');
const redis = require('redis');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Create Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
client.connect().catch(console.error);

// Handle Redis errors
client.on('error', (err) => console.log('Redis Client Error', err));

// Serve static files from root directory
app.use(express.static(__dirname));

// Visitor counter endpoint
app.get('/api/visitors', async (req, res) => {
  try {
    const count = await client.incr('visitor_count');
    res.json({ count });
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ error: 'Failed to update counter' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});