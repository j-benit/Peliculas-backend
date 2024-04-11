const express = require('express');
const router = express.Router();
const Productora = require ('../models/Productora');
const { validationResult, check } = require('express-validator');
const { model } = require('mongoose');

router.get('/', async function (req, res) {
    try {
        const productoras = await Productora.find(); 
        res.json(productoras);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al obtener las productoras');
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

        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;



     // Guardar productora en la base de datos
     productora = await productora.save();

     res.status(201).json(productora); // Respondemos con la productora creado y un código de estado 201 (creado)
 } catch (error) {
     console.error(error);
     res.status(500).send('Ocurrió un error al crear la productora');
 }

});

// editar

router.put("/:productoraId", 
[
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("estado", "El estado debe ser activo o inactivo").isIn(["activo", "inactivo"])
],
async function(req, res){
try {

    let productoraId = await Productora.findById(req.params.productoraId);
if (!productoraId){
    return res.send("la productora no existe");
}
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({messages: errors.array()});
}
productoraId.nombre = req.body.nombre;
productoraId.estado = req.body.estado;
productoraId.slogan = req.body.slogan;
productoraId.descripcion = req.body.descripcion;
productoraId.fechaActualizacion = new Date();

productoraId = await productoraId.save();
  res.send(productoraId);

}catch(error){
   console.log(error);
   res.send("ocurrio un error");
}
});
module.exports = router;
