const db = require("../config/db");
const path = require('path') // Aquí importa tu conexión a la base de datos

// Crear un producto (Solo para admin)
const createProduct = (req, res) => {
  const { nombre, descripcion, precio } = req.body;

  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const query =
    "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)";
  db.query(query, [nombre, descripcion, precio || null], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al crear el producto", error: err.message });
    }
    res
      .status(201)
      .json({
        message: "Producto creado exitosamente",
        productId: results.insertId,
      });
  });
};

// Obtener todos los productos (Accesible para todos)
const getAllProducts = (req, res) => {
  const query = "SELECT * FROM productos";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          message: "Error al obtener los productos",
          error: err.message,
        });
    }
    
    return res.status(200).json(results);
  });
};



// Obtener un producto por ID (Accesible para todos)
const getProductById = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM productos WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al obtener el producto", error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(results[0]);
  });
};

// Actualizar un producto (Solo para admin)
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  const query =
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?";
  db.query(query, [nombre, descripcion, precio || null, id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          message: "Error al actualizar el producto",
          error: err.message,
        });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  });
};

// Eliminar un producto (Solo para admin)
const deleteProduct = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM productos WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al eliminar el producto", error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  });
};



module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,

};
