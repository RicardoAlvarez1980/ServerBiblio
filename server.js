// Importar módulos necesarios
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const librosRoutes = require('./routes/librosRoutes.js');
const usuariosRoutes = require('./routes/usuariosRoutes.js');
const prestamosRoutes = require('./routes/prestamosRoutes.js');
const bibliotecarioRoutes = require('./routes/bibliotecarioRoutes');
const autoresRoutes = require('./routes/autoresRoutes');



// Rutas para libros
app.use('/libros', librosRoutes);

// Rutas para usuarios
app.use('/usuarios', usuariosRoutes);

// Rutas para préstamos
app.use('/prestamos', prestamosRoutes);

// Rutas para bibliotecarios
app.use('/bibliotecarios', bibliotecarioRoutes);

// Rutas para autores
app.use('/autores', autoresRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
