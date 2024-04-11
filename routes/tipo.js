const express = require('express');
const router = express.Router();
const Tipo = require ('../models/Tipo.js'); 
const { validationResult, check } = require('express-validator');


router.get('/', async function (req, res ){
    try{
        const tipo = await Tipo.find();
    res.json(tipo);
    }catch(error){
        console.error(error);
        res.status(500).send("ocurrio un error al obtener el tipo");
    }
});

router.post('/', [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("estado", "El estado debe ser activo o inactivo").isIn(["activo", "inactivo"])
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let tipo = new Tipo(); 
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();
        // Verificar si descripcion está presente en req.body antes de asignarla
        if (req.body.descripcion) {
            tipo.descripcion = req.body.descripcion;
        }

        // Guardar el tipo en la base de datos
        tipo = await tipo.save();

        res.status(201).json(tipo); // Respondemos con el tipo creado y un código de estado 201 (creado)
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al crear el tipo');
    }
}); 
module.exports = router;
