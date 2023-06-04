const express = require('express');
const cluster = require('cluster');
const os = require('os');
const pid = process.pid;
require('./database');

const app = express();
app.use(express.json());

const clienteRoutes = require('./routes/clienteRoutes');

// Rutas para los módulos
app.use('/cliente', clienteRoutes);

const clienteController = require('./controllers/clienteController');

app.get("/", (request, response) => {
  response.send("Proyecto en Ejecución");
});

//CRUD CLIENTE
app.get("/cliente", async (request, response) => {
  try {
    const objeto = await clienteController.obtenerClientes(request, response);
    response.json(objeto);
  } catch (error) {
    response.status(500).json({ error: 'Error al Procesar la Solicitud' });
  }
});

app.post("/cliente", async (request, response) => {
  try {
    const objeto = await clienteController.crearCliente(request, response);
    response.json(objeto);
  } catch (error) {
    response.status(500).json({ error: 'Error al obtener los objetos' });
  }
});

app.put('/cliente/:id', async (req, res) => {
  try {
    const objeto = await clienteController.actualizarCliente({ id: req.params.id }, req.body, { new: true });
    if (!objeto) {
      return res.status(404).json({ error: 'Objeto no encontrado' });
    }
    res.json(objeto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el objeto' });
  }
});

app.delete('/cliente/:id', async (req, res) => {
  try {
    const objeto = await clienteController.eliminarCliente({ id: req.params.id });
    if (!objeto) {
      return res.status(404).json({ error: 'Objeto no encontrado' });
    }
    res.json(objeto);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el objeto' });
  }
});
//Ponemos la aplicacion en escucha
//app.listen(3002, () => {
//  console.log('Servidor en ejecución en el puerto 3002');
//});

//Ponemos la aplicacion en escucha escalandose
if (cluster.isMaster) {
  const cpus = os.cpus().length; //Aqui obtenemos la cantidad de cpus libres que hay en el equipo para por ahi lanzar el app

  console.log(`obteniendo ${cpus} CPUs`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork(); //Se crea varias instancias por cada cpu
   // console.log(`Iniciando proceso ${pid}`);
  }
} else {
  app.listen(3002, () => {
    console.log('Servidor en ejecución en el puerto 3002');
  });
  console.log(`Iniciando proceso ${pid}`);
}
