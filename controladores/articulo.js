const validator = require("validator");
const Articulo = require("../modelos/Articulo");

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
    let parametros = req.body;

    //Validar los datos
    try{

        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                validator.isLength(parametros.titulo, {min:5, max:25});
        let validar_contenido = !validator.isEmpty(parametros.contenido);
        
        if(!validar_titulo || !validar_contenido){
            throw new Error("No se ha validado la información");
        }

    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos"
        });
    }
    //Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    //Asignar valores a objeto (Manual - automatico)
    //articulo.titulo = parametros.titulo;

    //Guardar articulo en bd
    articulo.save().then((articuloGuardado)=>{
        if (!articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "Articulo no guardado"
            });
        }
        // return result
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo guardado"
        })
    }).catch((err)=>{
        console.log(err);
    })
}

//Leer Articulos
const listar = (req, res) => {

    let consulta = Articulo.find({});

    if(req.params.ultimos){
        consulta.limit(req.params.ultimos);
    }
    
    //Ordenar por fecha descendente
    consulta.sort({fecha: -1})
        .then((articulos) => {

        if(!articulos){
            return res.status(404).json({
                status: "error",
                mensaje: "No hay datos"
            });
        }

        return res.status(200).json({
            status: "success",
            contador: articulos.length,
            articulos,
        })

    }).catch((err)=>{
        console.log(err);
    });

}

//Conseguir un articulo
const uno =  (req, res) => {

    //Recoger id por la url
    let id = req.params.id;

    //Buscar el articulo
    Articulo.findById(id)
    .then(articulo => {
        if(!articulo){
            return res.status(404).json({
                status: "error",
                mensaje: "No encontrado"
            });
        }
        return res.status(200).json({
            status: "success",
            articulo
        })
    })
    .catch((err)=>{
        console.log(err);
    });;

    //Si no existe deolver error

    //Devolver resultado

}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno
}