const express = require('express');
const router = express.Router();
const Media = require("../models/Media.js");
const { validarMedia } = require("../helpers/validar-Media");


router.get("/", async function (req, res) {
    try {
        const media = await Media.find().populate([
            { path: "genero", select: "nombre estado" },
            { path: "directorPrincipal", select: "nombre estado" },
            { path: "productora", select: "nombre estado" },
            { path: "tipo", select: "nombre estado" }
        ]);
        res.send(media); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Ocurrió un error al consultar la media");
    }
});

async function verificarInventarioPorSerial(serial) {
    // Utiliza la función estática findOne del modelo Media para buscar en la base de datos
    const mediaExistente = await Media.findOne({ serial });

    // Se devuelve true si se encuentra una media con el serial dado (mediaExistente no es null)
    // Se devuelve false si no se encuentra ninguna media con el serial dado (mediaExistente es null)
    return mediaExistente !== null;
}


// POST para crear una mueva media

router.post("/", async function (req, res) {
    try {
        const { serial, titulo, sinopsis, urlPelicula, imagen, fechaCreacion, fechaActualizacion, añoEstreno, generoPrincipal,descripcion, tipo } = req.body;

        const existeMedia = await verificarInventarioPorSerial(serial);
        if (existeMedia) {
            return res.status(400).send("Ya existe el serial para otra media");
        }

        const nuevaMedia = new Media({
            serial,
            titulo,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date(),
            sinopsis,
            urlPelicula,
            imagen,
            fechaCreacion, 
            fechaActualizacion, 
            añoEstreno, 
            generoPrincipal,
            tipo,
            descripcion
            // Agregar aquí más campos según sea necesario
        });

        await nuevaMedia.save();
        res.status(201).send(nuevaMedia);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ocurrió un error al crear la media");
    }
});


// PUT para actualizar un inventario por su ID
router.put("/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const { serial, titulo, sinopsis, urlPelicula, imagen, fechaCreacion, fechaActualizacion, añoEstreno, generoPrincipal, directorPrincipal, productora, tipo } = req.body;

        let media = await Media.findById(id);
        if (!media) {
            return res.status(404).send("la media no existe");
        }

        // Verificar si el nuevo serial ya existe 
        if (serial && serial !== media.serial) {
            const existeMediaPorSerial = await verificarMediaPorSerial(serial);
            if (existeMediaPorSerial) {
                return res.status(400).send("Ya existe una media con el mismo serial");
            }
        }

        // Actualizar los campos condicionalmente
        media.serial = serial || media.serial;
        media.titulo = titulo || media.titulo;
        media.sinopsis = sinopsis || media.sinopsis;
        media.urlPelicula = urlPelicula || media.urlPelicula;
        media.imagen = imagen || media.imagen;
        media.fechaCreacion = fechaCreacion || media.fechaCreacion;
        media.generoPrincipal = generoPrincipal || media.generoPrincipal;
        media.directorPrincipal = directorPrincipal|| media.directorPrincipal;
        media.productora = productora ||media.productora;
        media.tipo = tipo || media.tipo;
        media.añoEstreno = añoEstreno || media.añoEstreno;
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ocurrió un error al actualizar la media");
    }
});


// DELETE para eliminar un medio por su ID
router.delete("/:id" , async function (req, res) {
    try {
        const { id } = req.params;

        // Buscar el medio por su ID
        const med = await Media.findById(id);
        if (!med) {
            return res.status(404).send("La media no existe");
        }

        // Eliminar la media
        await med.deleteOne();

        res.send("La media ha sido eliminada correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Ocurrió un error al eliminar la media");
    }
});

module.exports = router;


