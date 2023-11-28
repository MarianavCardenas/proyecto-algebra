var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mensajes/form',{
  layout: 'mensajes/layout'}) ;
});

router.post('/', async (req,res,next) =>{

  console.log(req.body)

  var nombre= req.body.nombre;
  var email= req.body.email;
  var message= req.body.message;

  var obj ={
    to:'cardenasmarianav.89@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre  + " "+ email + " " + message 
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user:process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await transporter.sendMail(obj);
  res.render('mensajes/form', {layout: 'mensajes/layout', 
  mensaje: 'mensaje enviado correctamente'}
  
  )

});





module.exports = router;