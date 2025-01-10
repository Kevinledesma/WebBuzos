const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Función para registrar un nuevo usuario
const registerUser = (nombre, email, contraseña, rol = 'cliente', callback) => {
  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = 'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, email, hashedPassword, rol], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  });
};

// Función para obtener un usuario por su email
const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = {
  registerUser,
  getUserByEmail,
};
