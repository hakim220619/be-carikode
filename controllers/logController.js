const Log = require('../models/LogModel');  // Mengimpor model Log

// Menambahkan log aktivitas
exports.createLog = async (user_id, action, description = '') => {
  try {
    const logData = {
      user_id,            // ID user yang melakukan aksi
      action,             // Deskripsi aksi (misalnya 'User registered')
      description,        // Penjelasan lebih lanjut tentang aksi (optional)
    };
    
    // Menambahkan log ke database
    await Log.create(logData);
  } catch (error) {
    console.error('Error creating log:', error);
  }
};
