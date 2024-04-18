const Articulo = require("../modelos/Articulo");
const { validarArticulo } = require("../helpers/validar");
const path = require("path");
const fs = require("fs");

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Acción de prueba",
  });
};

const curso = (req, res) => {
  console.log("Se ha ejecutado el endpoint probando");

  return res.status(200).json([
    {
      curso: "React",
      autor: "Cesar Mesa",
      url: "cesar.mesa.com",
    },
    {
      curso: "React",
      autor: "Cesar Mesa",
      url: "cesar.mesa.com",
    },
  ]);
};

const crear = (req, res) => {
  // Recoger parametros por post a guardar
  let parametros = req.body;

  //Validar los datos
  try {
    validarArticulo(res, parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos",
    });
  }

  //Crear el objeto a guardar
  const articulo = new Articulo(parametros);

  //Asignar valores a objeto (Manual - automatico)
  //articulo.titulo = parametros.titulo;

  //Guardar articulo en bd
  articulo
    .save()
    .then((articuloGuardado) => {
      if (!articuloGuardado) {
        return res.status(400).json({
          status: "error",
          mensaje: "Articulo no guardado",
        });
      }
      // return result
      return res.status(200).json({
        status: "success",
        articulo: articuloGuardado,
        mensaje: "Articulo guardado",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Leer Articulos
const listar = (req, res) => {
  let consulta = Articulo.find({});

  if (req.params.ultimos) {
    consulta.limit(req.params.ultimos);
  }

  //Ordenar por fecha descendente
  consulta
    .sort({ fecha: -1 })
    .then((articulos) => {
      if (!articulos) {
        return res.status(404).json({
          status: "error",
          mensaje: "No hay datos",
        });
      }

      return res.status(200).json({
        status: "success",
        contador: articulos.length,
        articulos,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Conseguir un articulo
const uno = (req, res) => {
  //Recoger id por la url
  let id = req.params.id;

  //Buscar el articulo
  Articulo.findById(id)
    .then((articulo) => {
      if (!articulo) {
        return res.status(404).json({
          status: "error",
          mensaje: "No encontrado",
        });
      }
      return res.status(200).json({
        status: "success",
        articulo,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //Si no existe deolver error

  //Devolver resultado
};

//Eliminar articulos
const borrar = (req, res) => {
  //Recoger id por la url
  let articulo_id = req.params.id;

  Articulo.findOneAndDelete({ _id: articulo_id })
    .then((articulo) => {
      if (!articulo) {
        return res.status(404).json({
          status: "error",
          mensaje: "No encontrado",
        });
      }
      return res.status(200).json({
        status: "Articulo eliminado correctamente",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editar = (req, res) => {
  let articulo_id = req.params.id;

  //Recoger datos del body
  let parametros = req.body;

  //Validar datos
  try {
    validarArticulo(res, parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos",
    });
  }

  //Buscar y actualizar articulo
  Articulo.findOneAndUpdate({ _id: articulo_id }, parametros, { new: true })
    .then((articuloActualizado) => {
      if (!articuloActualizado) {
        return res.status(500).json({
          status: "error",
          mensaje: "Error al actualizar",
        });
      }
      //Devolver respuesta
      return res.status(200).json({
        status: "success",
        articulo: articuloActualizado,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const subir = (req, res) => {
  // Configurar multer

  // Recoger el fichero de imagen
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Petición invalida",
    });
  }
  // Nombre de la imagen
  let archivo = req.file.originalname;
  // Extensión del archivo
  let archivo_split = archivo.split(".");
  let archivo_extension = archivo_split[1];
  //Comprobar extensión correcta
  if (
    archivo_extension != "png" &&
    archivo_extension != "jpg" &&
    archivo_extension != "jpeg" &&
    archivo_extension != "gif"
  ) {
    //Borrar archivo y dar respuesta
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "Error",
        mensaje: "Extensión invalida",
      });
    });
  } else {
    //Buscar id
    let articulo_id = req.params.id;

    //Buscar y actualizar articulo
    Articulo.findOneAndUpdate({ _id: articulo_id }, {imagen: req.file.filename}, { new: true })
      .then((articuloActualizado) => {
        if (!articuloActualizado) {
          return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar",
          });
        }
        //Devolver respuesta
        return res.status(200).json({
          status: "success",
          articulo: articuloActualizado,
          fichero: req.file
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }
};

const imagen = ( req, res ) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/"+ fichero;

    fs.stat(ruta_fisica, (error, existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "Imagen no existe",
                existe,
                fichero,
                ruta_fisica
              });
        }
    })

};

const buscador = (req, res) => {

    // Sacar string busqueda
    let busqueda = req.params.busqueda;

    // Find OR 
    Articulo.find({
        "$or" : [
            { "titulo": { "$regex": busqueda, "$options": "i"}},
            { "contenido": { "$regex": busqueda, "$options": "i"}}
        ]
    }).sort({fecha: -1})
    .then((articulosEncontrados, error) => {

        if(!articulosEncontrados || articulosEncontrados.length <= 0){
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos",
                error
            })
        }

        return res.status(200).json({
            status: "sucess",
            articulosEncontrados
        })

    }).catch((error) => {
        console.log(error);
    });

    // Ordenamiento

    // Ejecutar consulta

    //Devoler resultado

};


module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
  subir,
  imagen,
  buscador
};
