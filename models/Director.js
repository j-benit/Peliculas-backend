const { Schema, model, models } = require("mongoose");

const DirectorSchema =  Schema({
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
    }
});

module.exports = model('director', DirectorSchema);
