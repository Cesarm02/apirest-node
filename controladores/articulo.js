
const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Acción de prueba"
    });

}

module.exports = {
    prueba
}