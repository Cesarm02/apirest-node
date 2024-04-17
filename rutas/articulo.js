const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo")

//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

//Ruta util
router.post("/crear", ArticuloControlador.crear);

//Ruta get
router.get("/listar/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);

//Ruta delete
router.delete("/articulo/:id", ArticuloControlador.borrar);

//Ruta editar
router.put("/articulo/:id", ArticuloControlador.editar);

module.exports = router;


