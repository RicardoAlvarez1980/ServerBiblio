// controllers/librosController.js
const Libros = require('../models/librosModel');

// Controladores de libros

function getLibros(req, res) {
    Libros.getAllLibros((err, libros) => {
        if (err) {
            console.error('Error al obtener los libros:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(libros);
    });
}

function getLibroById(req, res) {
    const id_libro = req.params.id;
    Libros.getLibroById(id_libro, (err, libro) => {
        if (err) {
            console.error('Error al obtener el libro:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (!libro) {
            res.status(404).json({ error: 'Libro no encontrado' });
            return;
        }
        res.json(libro);
    });
}

function createLibro(req, res) {
    const nuevoLibro = req.body;
    Libros.createLibro(nuevoLibro, (err, resultado) => {
        if (err) {
            console.error('Error al crear el libro:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Libro creado exitosamente', id_libro: resultado.insertId });
    });
}

function updateLibro(req, res) {
    const id_libro = req.params.id;
    const libroData = req.body;
    Libros.updateLibro(id_libro, libroData, (err, resultado) => {
        if (err) {
            console.error('Error al actualizar el libro:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Libro no encontrado' });
            return;
        }
        res.json({ message: 'Libro actualizado exitosamente' });
    });
}

function deleteLibro(req, res) {
    const id_libro = req.params.id;
    Libros.deleteLibro(id_libro, (err, resultado) => {
        if (err) {
            console.error('Error al eliminar el libro:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Libro no encontrado' });
            return;
        }
        res.json({ message: 'Libro eliminado exitosamente' });
    });
}

module.exports = {
    getLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro
};
