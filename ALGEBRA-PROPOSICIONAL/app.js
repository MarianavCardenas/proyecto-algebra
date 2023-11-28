var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool= require ('./models/bd');
var session = require ('express-session');



var indexRouter = require('./routes/index');
var leyeslogicasRouter= require ('./routes/leyeslogicas');
var implicacionesRouter= require('./routes/implicaciones');
var razonamientoRouter= require ('./routes/razonamiento');
var conjuntosRouter = require ('./routes/conjuntos')
var unionRouter=require ('./routes/union');
var interseccionRouter=require('./routes/interseccion');
var relacionesRouter=require ('./routes/relaciones');
var equivalenciaRouter=require ('./routes/equivalencia');
var ordenRouter=require('./routes/orden');

var trabajo1Router=require('./routes/trabajo1');
var diagramaRouter=require('./routes/diagrama');
var formRouter= require('./routes/mensajes/form');

var loginRouter =require ('./routes/admin/login');
var contenidoRouter= require ('./routes/admin/contenido');
var registroRouter=require('./routes/admin/registro');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use (session ({
  secret:'12ddefe2gtrhdg93adg1er5g4',
  resave: false,
  saveUninitialized: true
}))

secured = async(req, res, next)=>{
  try {
    console.log (req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else{
      res.redirect ('/admin/login')
    }
  } catch (error){
    console.log(error);
  }
}



app.use('/', indexRouter);
app.use('/leyeslogicas', leyeslogicasRouter );
app.use ('/implicaciones', implicacionesRouter);
app.use('/razonamiento', razonamientoRouter);
app.use('/conjuntos', conjuntosRouter);
app.use('/union', unionRouter);
app.use('/interseccion', interseccionRouter);
app.use('/relaciones', relacionesRouter);
app.use('/equivalencia', equivalenciaRouter);
app.use('/orden', ordenRouter);

app.use('/trabajo1', trabajo1Router);
app.use('/diagrama', diagramaRouter);
app.use('/mensajes/form', formRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/registro', registroRouter);
app.use('/admin/contenido', secured , contenidoRouter);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
