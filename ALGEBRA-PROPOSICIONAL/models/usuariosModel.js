var pool = require('./bd');
var md5 = require('md5');

async function getUserAndPassword(user, password) {
    try {
        var query = 'select * from usuarios where usuario = ? and password =? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error)
    }
}

async function insertUsuarios(nombre, apellido, email, usuario, password) {
    try {
        var query = "insert into usuarios set ?";
        var userData = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            usuario: usuario,
            password: md5(password)
        };

        var rows = await pool.query(query, userData);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getUserAndPassword, insertUsuarios };