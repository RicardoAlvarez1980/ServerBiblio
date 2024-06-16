// Importar módulos necesarios
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const prestamosModel = require('./models/prestamosModel');


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


// Ruta para obtener los préstamos auditados
app.get('/auditoria-prestamos', async (req, res) => {
    try {
        const prestamos = await prestamosModel.getPrestamosAuditados();
        res.json(prestamos);
    } catch (error) {
        console.error('Error al obtener los préstamos auditados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener los préstamos auditados con filtrado opcional por estado
app.get('/auditoria-prestamos', async (req, res) => {
    try {
        let prestamos;
        const accion = req.query.accion; // Obtiene el valor del parámetro 'accion' de la URL

        if (accion === 'prestado' || accion === 'devuelto') {
            // Si se proporciona un valor válido para 'accion', filtramos por ese valor
            prestamos = await prestamosModel.getPrestamosAuditadosByAccion(accion);
        } else {
            // Si no se proporciona 'accion' o es un valor inválido, obtenemos todos los préstamos auditados
            prestamos = await prestamosModel.getPrestamosAuditados();
        }

        res.json(prestamos);
    } catch (error) {
        console.error('Error al obtener los préstamos auditados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Puerto de escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
