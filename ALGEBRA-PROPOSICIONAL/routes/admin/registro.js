var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');
var md5 = require ('md5')



/* GET home page. */
router.get('/', function (req, res, next) {
   

    res.render('admin/registro', {
        layout: 'admin/layout',

    });
});


  

router.post('/', async (req, res, next) => {
    try { 

        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var email = req.body.email;
        var usuario = req.body.usuario;
        var password = req.body.password;
        var passwordHash = md5 (password)
        
        

        if( req.body.nombre != '' && req.body.apellido != '' && req.body.email != '' && req.body.usuario != '' && req.body.password != '' ){
            await usuariosModel.insertUsuarios (nombre, apellido, email, usuario,passwordHash);
           
            res.redirect('/admin/login')


        
        } else {
            res.render('admin/registro', {
                layout: 'admin/layout',
                error: true,
               
            })
        }
    } catch (error) {
        console.log(error)

        res.render('admin/registro', {
            layout: 'admin/layout',
            error: true,
            message: 'no se cargo el registro correctamente'
        })

    }
})



module.exports = router;


