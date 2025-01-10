const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const path = require('path') // Si ya tienes el admin registrado en la base de datos

// Función para iniciar sesión
const login = (req, res) => {
  const { email, contraseña } = req.body;
  
  console.log("Datos recibidos:", req.body);  // Agrega esto para ver los datos

  // Asegúrate de que solo hay un admin
  userModel.getUserByEmail(email, (err, user) => {
    if (err || !user) {
      console.log("Usuario no encontrado:", email);  // Esto te ayudará a depurar
     
      return res.sendFile(path.join(__dirname, '../public/html/login.html'));
    }

    bcrypt.compare(contraseña, user.contraseña, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: user.id, rol: user.rol },
        'contraseña',  // Aquí puedes poner tu clave secreta de JWT
        { expiresIn: '1h' }  // El token expirará en 1 hora
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Para producción ponlo en 'true' cuando uses HTTPS
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 // 1 hora
      });

      return res.redirect('/api/admin/panel');
    });
  });
};

// Función de logout
const logout = (req, res) => {
  res.clearCookie('token');
  return res.sendFile(path.join(__dirname, '../public/html/login.html'));


};

module.exports = { login, logout };
