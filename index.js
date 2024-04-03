const exp = require('express');
const logger = require('morgan')
const app = exp();
const path = require('path');

/*const postRoute = require('./routes/route');*/

app.use('', require('./backend/routes/route'))
app.use(logger('dev'));
app.use(exp.urlencoded({extended: false}));
app.use(exp.json());

// Archivos estáticos
app.use(exp.static(path.join(__dirname, './frontend/assets')));
//app.use('/inicio', postRoute);
app.set('view engine', 'ejs');
// Conectar las páginas
app.set('views', path.join(__dirname, './frontend/views'));

app.listen(process.env.PORT, ( ) => {
    console.log('Servidor en línea');
})

