const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const productController = require('../controllers/products.controllers.js');
const { verifyToken } = require('../middlewares/auth.middleware'); // Asumo que tienes este middleware
const path = require('path');

// Ruta para acceder al formulario de login
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));  // Sirve el archivo de login
});


// Ruta para el login del administrador
router.post('/admin/login', authController.login); // Controlador de login para validar las credenciales

// Ruta protegida para acceder al panel de administración
router.get('/admin/panel', verifyToken, (req, res) => {
  // Verifica que el usuario sea admin
  if (req.user.rol === 'admin') {
    return res.sendFile(path.join(__dirname, '../public/html/panel.html')); // Redirige al panel
  } else {
    return res.status(403).json({ message: 'Acceso denegado. Solo administradores' });
  }
});

router.get('/admin/panel/data', verifyToken, productController.getAllProducts);


router.post('/admin/logout' , authController.logout);

module.exports = router;
