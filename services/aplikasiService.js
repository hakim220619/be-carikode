const Aplikasi = require('../models/aplikasiModel');
const db = require('../config/db');

const getAplikasi = async () => {
  const [rows] = await db.query('SELECT * FROM setting_aplikasi');
  return rows[0];
};
const getDetailAplikasi = async (uid) => {
    const [rows] = await db.query('SELECT * FROM detail_aplikasi WHERE uid = ?', [uid]);
    console.log(rows.length);
    
    return rows.length < 2 ? rows[0] : rows; // Return the first row if found, otherwise return all rows (empty array if no rows)
  };
  

module.exports = { getAplikasi, getDetailAplikasi };