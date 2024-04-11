const { Schema, model } = require("mongoose");

const MediaSchema = new Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    urlPelicula: {
        type: String,
        required: true,
    
    },
    imagen: {
        type: String,
        required: true,
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
        required: true,
    },
    añoEstreno: {
        type: Number, 
        required: true,
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'genero'
    },
    directorPrincipal:{
        type : Schema.Types.ObjectId,
        ref: 'director'

    },
    productora:{
        type : Schema.Types.ObjectId,
        ref: 'productora'
    },
    tipo:{
       type: Schema.Types.ObjectId,
       ref: 'tipo'
    }

});

module.exports = model('Media', MediaSchema);
