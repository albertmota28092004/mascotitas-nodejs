const exp = require('express');
const logger = require('morgan')
const app = exp();
let modeloProducto = require('./backend/models/productos.model');


app.use(logger('dev'));
app.use(exp.urlencoded({extended: false}));
app.use(exp.json());
app.listen(process.env.PORT, ( ) => {
    console.log('Servidor en línea');
})

app.get('/listarProductos', async (req, res) => {
    let listadoProductos = await modeloProducto.find();
    if(listadoProductos)
        res.status(200).json(listadoProductos);
    else
        res.status(404).json({error: "No se encontraron productos"});
});

app.get('/buscarProducto/:ref', async (req, res) => {
    let productoEncontrado = await modeloProducto.findOne({referencia:req.params.ref});
    if(productoEncontrado)
        res.status(200).json(productoEncontrado);
    else
        res.status(404).json({error: "Producto no encontrado"});
});

app.post('/insertarProducto', async (req, res) => {
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

app.post('/editarProducto', async (req,res) => {
    const productoEditado = {
        referencia: 1001,
        nombre: "Producto 1",
        descripcion: "Este es un producto 1",
        precio: 50000,
        stock: 100,
        imagen: "imagen.png",
        habilitado: true,
    };

    let Actualizacion = await modeloProducto.findOneAndUpdate({referencia:1000}, productoEditado);
    if(Actualizacion)
        res.status(200).json({"mensaje": "registro exitoso"});
    else
        res.status(404).json({"mensaje": "Se presentó un error"})
})





