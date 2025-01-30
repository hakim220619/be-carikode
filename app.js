const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Route untuk endpoint root (/)
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di api cariKode' });
});

// Gunakan routes untuk autentikasi dan user
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});