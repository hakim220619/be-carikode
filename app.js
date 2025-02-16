const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes/routes');
const cors = require('cors');
require('dotenv').config();


const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000'], // Ganti dengan alamat frontend Anda jika berbeda
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Pastikan header ini termasuk
  credentials: true,  // Jika menggunakan cookies, pastikan credentials diizinkan
};

// Gunakan CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());


// Route untuk endpoint root (/)
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di api cariKode' });
});

// Gunakan routes untuk autentikasi dan user
app.use('/api', Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});