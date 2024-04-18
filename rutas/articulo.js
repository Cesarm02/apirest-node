const express = require("express");
const multer = require("multer");
const ArticuloControlador = require("../controladores/articulo")

const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, './imagenes/articulos')
    }, 

    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname)
    }
});
const subidas = multer({storage: almacenamiento});


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

router.post("/subr-imagen/:id", [subidas.single("file0")],  ArticuloControlador.subir);
router.get("/imagen/:fichero", ArticuloControlador.imagen);
router.get("/buscar/:busqueda", ArticuloControlador.buscador);

module.exports = router;


