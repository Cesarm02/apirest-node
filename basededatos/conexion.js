const mongoose = require("mongoose");

const conexion = async() => {

    try{

        await mongoose.connect("mongodb://localhost:27017/mi_blog");

        // Parametros dentro de objeto
        // useNewUrlParser: true
        // userUnifiedTopology: true
        // useCreateIndex: true 

        console.log("Conexión realizada a mi_blog");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }

}

module.exports = {
    conexion
}
