const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controllers.js");
const { verifyToken } = require("../middlewares/auth.middleware");
const path = require("path");

// Rutas accesibles para todos
router.get("/data", productController.getAllProducts);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

router.get('/details/:id', productController.getProductById);

router.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/producto.html'));
});


// Rutas protegidas (Solo para admin)
router.post(
  "/agregar",
  verifyToken,
  (req, res, next) => {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  },
  productController.createProduct
);

router.put(
  "/modificar/:id",
  verifyToken,
  (req, res, next) => {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  },
  productController.updateProduct
);

router.delete(
  "/eliminar/:id",
  verifyToken,
  (req, res, next) => {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  },
  productController.deleteProduct
);

module.exports = router;
