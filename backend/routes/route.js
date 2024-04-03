const express = require('express')
const router = express.Router()
let modeloProducto = require('../models/productos.model');

router.get('/', (req, res) => {
    let titulo = '+Cotitas - Index';
    res.render('inicio', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});

/* Operaciones CRUD */ 

router.get('/productos', async (req, res) => {
    let listadoProductos = await modeloProducto.find();
    if(listadoProductos)
        res.status(200).json(listadoProductos);
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

router.post('/productos', async (req, res) => {
    const nuevoProducto = {
        referencia: 1000,
        nombre: "Producto 1",
        descripcion: "Este es un producto 1",
        precio: 50000,
        stock: 100,
        imagen: "imagen.png",
        habilitado: true,
    };

    let Insercion = await modeloProducto.create(nuevoProducto);
    if(Insercion)
        res.status(200).json({"mensaje": "registro exitoso"});
    else
        res.status(404).json({"mensaje": "Se presentó un error"})
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



