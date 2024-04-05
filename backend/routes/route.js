const express = require('express')
const router = express.Router()
let modeloProducto = require('../models/productos.model');

router.get('/', (req, res) => {
    let titulo = '+Cotitas - Index';
    res.render('pages/inicio', {
        "titulo": titulo
    });
});


/* Operaciones CRUD */ 

router.get('/productos', async (req, res) => {
    let titulo = '+Cotitas - Productos';
    let listadoProductos = await modeloProducto.find();
    console.log(listadoProductos)
    if(listadoProductos)
        res.render('pages/listar_productos', {
            "titulo": titulo,
            "listadoProductos": listadoProductos
    })
    else
        res.status(404).json({error: "No se encontraron productos"});
});

router.get('/productos/:ref', async (req, res) => {
    let productoEncontrado = await modeloProducto.findOne({referencia:req.params.ref});
    if(productoEncontrado)
        res.status(200).json(productoEncontrado);
    else
        res.status(404).json({error: "Producto no encontrado"});
});



router.put('/productos/:ref', async (req,res) => {
    const productoEditado = {
        referencia: req.params.ref,
        nombre: "Producto 1",
        descripcion: "Este es un producto 1",
        precio: 50000,
        stock: 100,
        imagen: "imagen.png",
        habilitado: true,
    };

    let Actualizacion = await modeloProducto.findOneAndUpdate({referencia:req.params.ref}, productoEditado);
    if(Actualizacion)
        res.status(200).json({"mensaje": "Actualización exitosa!"});
    else
        res.status(404).json({"mensaje": "Se presentó un error"});
})

router.delete('/productos/:ref', async (req, res) => {
    console.log(req.params.ref)
    let eliminacion = await modeloProducto.findOneAndDelete({referencia:req.params.ref})
    if (eliminacion)
        res.status(200).json({"mensaje":"Eliminación exitosa!"})
    else
        res.status(404).json({"mensaje":"Se presentó un error"})
}) 

module.exports = router



