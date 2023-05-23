const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
//Conexion para trabajar Local(Sin docker)

//const mongoURI = 'mongodb://127.0.0.1:27017/Caso_1';

//Conexion para trabajar con docker
const mongoURI = 'mongodb://mongo/Caso_1';

// Opciones de conexión a la base de datos
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
};

// Conexión a la base de datos
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
