const { conexion } = require("./basededatos/conexion");
const express = require("express");
const cors = require("cors");

//Iniciar app
console.log("Node inicio");

//Conectar a la base
conexion();

//Servidor node
const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

//Convertir body a objeto Json
app.use(express.json());

//RUTAS
//Crear rutas
const rutas_articulo = require("./rutas/articulo");

//Cargo las rutas
app.use("/api", rutas_articulo)

//Rutas pruebas Hardcodeadas
app.get("/probando", (req, res) => {
    
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json([{
        curso: "React",
        autor: "Cesar Mesa",
        url: "cesar.mesa.com"
    },
    {
        curso: "React",
        autor: "Cesar Mesa",
        url: "cesar.mesa.com"
    }]);
});

app.get("/", (req, res) => {
    
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).send(`<h1> Hola</h1>`);
});

//Crear servidor
app.listen(puerto, () => {
    console.log("Servidor correindo en puerto " + puerto)
})

