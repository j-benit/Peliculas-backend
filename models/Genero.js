const { Schema, model } = require("mongoose");

const GeneroSchema =  Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: [
            "activo", "inactivo",
        ]
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
        required: false  // Hacer que la descripcion sea opcional
    }
});


module.exports = model('genero', GeneroSchema);
