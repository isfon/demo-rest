import express from 'express'
import bodyParser from 'body-parser'
import  methodOverride from 'method-override'

const app = express();

// Cargar Rutas
const userRoutes = require('./routes/user.routes');

app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
})
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// urls 
app.use('/api', userRoutes);
//Rutas Base
app.get('/', (req, res) => {
    return res.status(200).send('Api works');
});
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })
  
  // Error handler
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.statusCode = err.status
    res
      .send({
        message: err.message
      })
  })

module.exports = app;
