const exp = require('express');
const logger = require('morgan')
const app = exp();
const path = require('path');
let modeloProducto = require('./backend/models/productos.model');


/*const postRoute = require('./routes/route');*/

app.use('', require('./backend/routes/route'))
app.use(logger('dev'));
app.use(exp.urlencoded({extended: false}));
app.use(exp.json());

// Archivos estáticos
app.use(exp.static(path.join(__dirname, './frontend/views/assets')));
//app.use('/inicio', postRoute);
app.set('view engine', 'ejs');
// Conectar las páginas
app.set('views', path.join(__dirname, './frontend/views'));

app.listen(process.env.PORT, ( ) => {
    console.log('Servidor en línea');
})

app.post('/productos', async (req, res) => {
    const nuevoProducto = {
        referencia:req.body.referenciaProducto,
        nombre:req.body.nombreProducto,
        descripcion:req.body.descripcionProducto,
        precio:req.body.precioProducto,
        stock:req.body.stockProducto,
        imagen:req.body.imagenProducto,
        habilitado:true
    };

    let Insercion = await modeloProducto.create(nuevoProducto);
    if(Insercion) {
        let titulo = '+Cotitas - Productos';
        let listadoProductos = await modeloProducto.find();
        res.locals.successMessage = 'Producto registrado exitosamente';
        res.render('pages/listar_productos', {
            "titulo": titulo,
            "listadoProductos": listadoProductos
    });
    } else
        res.status(404).json({"mensaje": "Se presentó un error"})
});
