const db = require("../config/db"); // Aquí importa tu conexión a la base de datos

// Crear una nueva consulta
exports.createConsulta = (req, res) => {
  const {
    nombre_cliente,
    correo_cliente,
    telefono_cliente,
    id_producto,
    personalizacion,
    mensaje,
  } = req.body;

  if (
    !nombre_cliente ||
    !correo_cliente ||
    !telefono_cliente ||
    !id_producto ||
    !personalizacion
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos obligatorios deben estar completos" });
  }

  const { color, tamaño, logotipo, inscripcion } = personalizacion;

  const query = `
      INSERT INTO consultas (nombre_cliente, correo_cliente, telefono_cliente, id_producto, color, tamaño, logotipo, inscripcion, mensaje)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      nombre_cliente,
      correo_cliente,
      telefono_cliente,
      id_producto,
      color,
      tamaño,
      logotipo,
      inscripcion,
      mensaje,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al registrar la consulta:", err);
        return res
          .status(500)
          .json({
            message: "Error al registrar la consulta",
            error: err.message,
          });
      }
      res.status(201).json({ message: "Consulta enviada exitosamente" });
    }
  );
};

// Obtener todas las consultas (Solo para el admin)
exports.getAllConsultas = (req, res) => {
  const query = `
    SELECT c.*, p.nombre AS producto_nombre 
    FROM consultas c
    LEFT JOIN productos p ON c.id_producto = p.id;

  `;

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          message: "Error al obtener las consultas",
          error: err.message,
        });
    }
    console.log('Resultados obtenidos:', results);
    res.status(200).json(results);
  });
};
