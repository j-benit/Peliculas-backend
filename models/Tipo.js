const { Schema, model } = require("mongoose");

const TipoSchema =  Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = model('tipo', TipoSchema);
