const exp = require('express');
const logger = require('morgan')
const app = exp();
const postRoute = require('./routes/route');

app.use('', require('./routes/route'))
app.use(logger('dev'));
app.use(exp.urlencoded({extended: false}));
app.use(exp.json());
app.listen(process.env.PORT, ( ) => {
    console.log('Servidor en línea');
})

