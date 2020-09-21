'use stric'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '2jBzWe[*<rb.GV`M*(N+-J+.euC';

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({mensaje: 'Error de autorización.'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({mensaje: 'Token de autorización expirado.'});
        } else {

        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({mensaje: 'Token de autorización invalido.'});
    }

    req.user = payload;
    next();
};