const aplikasiService = require("../services/aplikasiService");

exports.getAplikasi = async (req, res) => {
  try {
    const aplikasi = await aplikasiService.getAplikasi();
    res.json(aplikasi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getDetailAplikasi = async (req, res) => {
  try {
    // console.log(req.query.id);
    
    const aplikasi = await aplikasiService.getDetailAplikasi(req.query.id);
    res.json(aplikasi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};