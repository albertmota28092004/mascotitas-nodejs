const express = require('express')
const router = express.Router()
let modeloProducto = require('../models/productos.model');
let modeloUsuario = require('../models/usuario.model');


router.get('/', (req, res) => {
    let titulo = '+Cotitas - Index';
    res.render('pages/inicio', {
        "titulo": titulo,
        "session": req.session  
    });
});

router.get('/iniciarSesion_Registrarse', (req, res) => {
    let titulo = '+Cotitas - Iniciar Sesión';
    res.render('pages/iniciarSesion_Registrarse', {
        "titulo": titulo,
        "session": req.session
    });
})

/* Operaciones CRUD */ 



// router.get('/usuario', async (req, res) => {
//     const { correo_inicio, contrasena_inicio } = req.body;
//     try {
//         const persona_encontrada = await modeloUsuario.findOne({ correo: correo_inicio });
//         if (persona_encontrada) {
//             const contrasena_valida = (contrasena_inicio === persona_encontrada.contrasena);
//             if (contrasena_valida) {
//                 req.session.correo = correo_inicio;
//                 res.redirect('/');
//             } else {
//                 res.send('<h2>Contraseña incorrecta</h2>');
//             }
//         } else {
//             res.send('<h2>Usuario no registrado</h2>');
//         }
//     } catch (error) {
//         console.error(error);
//         res.send('<h2>Error en el inicio de sesión</h2>');
//     }
// });

router.get('/cerrar_sesion', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            } else {
                res.redirect('/');
            }
        });
    } else {
        console.log('No se encontró ')
    }
    
});

router.get('/usuarios', async (req, res) => {
    let titulo = '+Cotitas - Usuarios';
    let listadoUsuarios = await modeloUsuario.find();
    console.log(listadoUsuarios)
    if(listadoUsuarios)
        res.render('pages/listar_usuarios', {
            "titulo": titulo,
            "listadoUsuarios": listadoUsuarios
    })
    else
        res.status(404).json({error: "No se encontraron productos"});
});

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



