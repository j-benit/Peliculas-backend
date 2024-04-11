const express = require('express');
const router = express.Router();
const Director = require ('../models/Director.js');
const { validationResult, check } = require('express-validator');
const { model } = require('mongoose');

router.get('/', async function (req, res) {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al obtener los directores');
    }
});

// registrar
router.post('/', [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("estado", "El estado debe ser activo o inactivo").isIn(["activo", "inactivo"])
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date();
        director.fechaActualizacion = new Date();


        // Guardar el director en la base de datos
       director = await director.save();

        res.status(201).json(director); // Respondemos con el director creado y un código de estado 201 (creado)
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al crear el director');
    }
});

// editar
router.put("/:directorId", 
[
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("estado", "El estado debe ser activo o inactivo").isIn(["activo", "inactivo"])
],
async function(req, res){
try {

    let directorId = await Director.findById(req.params.directorId);
if (!directorId){
    return res.send("el director no existe");
}
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({messages: errors.array()});
}
  directorId.nombre = req.body.nombre;
  directorId.estado = req.body.estado;
  directorId.fechaActualizacion = new Date();

 directorId = await directorId.save();
  res.send(directorId);

}catch(error){
   console.log(error);
   res.send("ocurrio un error");
}
});
module.exports = router;
