const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Use environment variable from Render or Atlas
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set. Please add it as an environment variable.");
  process.exit(1);
}

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      setTimeout(connectWithRetry, 5000); // retry after 5s
    });
};
connectWithRetry();

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Node.js + MongoDB + Render 🚀');
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Render expects PORT env variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
