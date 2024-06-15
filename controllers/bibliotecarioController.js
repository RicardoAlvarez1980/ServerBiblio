// controllers/bibliotecarioController.js

const Bibliotecario = require('../models/bibliotecarioModel');

// Obtener todos los bibliotecarios
exports.getAllBibliotecarios = (req, res) => {
    Bibliotecario.getAllBibliotecarios((err, bibliotecarios) => {
        if (err) {
            console.error('Error al obtener bibliotecarios:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(bibliotecarios);
    });
};

// Obtener un bibliotecario por ID
exports.getBibliotecarioById = (req, res) => {
    const id = req.params.id;
    Bibliotecario.getBibliotecarioById(id, (err, bibliotecario) => {
        if (err) {
            console.error('Error al obtener bibliotecario por ID:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (!bibliotecario) {
            res.status(404).json({ error: 'Bibliotecario no encontrado' });
            return;
        }
        res.json(bibliotecario);
    });
};

// Crear un nuevo bibliotecario
exports.createBibliotecario = (req, res) => {
    const { nombre, telefono, email } = req.body;
    const newBibliotecario = { nombre, telefono, email };

    Bibliotecario.createBibliotecario(newBibliotecario, (err, result) => {
        if (err) {
            console.error('Error al crear bibliotecario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Bibliotecario creado exitosamente', id: result.insertId });
    });
};
