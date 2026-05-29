require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/index');

const authRoutes = require('./routes/auth');
const careerRoutes = require('./routes/careers');
const savedRoutes = require('./routes/saved');
const commentRoutes = require('./routes/comments');
const professionalRoutes = require('./routes/professionals');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/professionals', professionalRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🔍 CareerLens backend is running!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ CareerLens server running on port ${PORT}`);
});