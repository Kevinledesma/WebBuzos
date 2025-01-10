const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultas.controllers');
const { verifyToken } = require('../middlewares/auth.middleware');
const path = require('path');

// Ruta para registrar una nueva consulta (Accesible para todos)
router.get('/nueva', (req,res)=>{
  res.sendFile(path.join(__dirname, "../public/html/consultas.html"));

});

router.post('/', consultasController.createConsulta);



router.get('/adminConsultas', verifyToken, (req, res) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  res.sendFile(path.join(__dirname, '../public/html/adminConsultas.html'));
});

// Ruta para obtener todas las consultas (API)
router.get('/', verifyToken, (req, res) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  consultasController.getAllConsultas(req, res);
});

module.exports = router;
