const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado, se requiere autenticación' });
  }

  jwt.verify(token, 'contraseña', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    // Guardar la información del usuario en el objeto `req.user`
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
