'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 9000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pack', { useMongoClient: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('La base corriendo correctamente');
        app.listen(port, () => {
            console.log(`Servidor del api escuchando en http://localhost:${port}`);
        });
    }
});