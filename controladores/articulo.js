
const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Acción de prueba"
    });

}

const curso = (req, res) =>  {
    
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
};

const crear = (req, res) => {

    // Recoger parametros por post a guardar

    //Validar los datos

    //Crear el objeto a guardar

    //Asignar valores a objeto

    //Guardar articulo en bd

    //Devolver resultado
    return res.status(200).json({
        mensaje: "Accion de guardar"
    })

}

module.exports = {
    prueba,
    curso,
    crear
}