const express = require('express');
const router = express.Router();
const Genero = require ('../models/Genero.js');
const { validationResult, check } = require('express-validator');
const { model } = require('mongoose');

router.get('/', async function (req, res) {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al obtener los generos');
    }
});


//crear
router.post('/', [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("estado", "El estado debe ser activo o inactivo").isIn(["activo", "inactivo"])
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();


        // Guardar el genero en la base de datos
       genero = await genero.save();

        res.status(201).json(genero); // Respondemos con el director creado y un código de estado 201 (creado)
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al crear el genero');
    }
});

// editar
router.put("/:generoId", 
[
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("estado", "El estado debe ser activo o inactivo").isIn(["activo", "inactivo"])
],
async function(req, res){
try {

    
    let generoId = await Genero.findById(req.params.generoId);

if (!generoId){
    return res.send("el genero no existe");
}
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({messages: errors.array()});
}
generoId.nombre = req.body.nombre;
generoId.estado = req.body.estado;
generoId.fechaActualizacion = new Date();

generoId = await generoId.save();
  res.send(generoId);

}catch(error){
   console.log(error);
   res.send("ocurrio un error");
}
});
module.exports = router;


