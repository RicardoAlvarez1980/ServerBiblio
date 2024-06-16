const autoresModel = require('../models/autoresModel');

function getAllAutores(req, res) {
    autoresModel.getAllAutores((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
}

function getAutorById(req, res) {
    const id_autor = req.params.id_autor;
    autoresModel.getAutorById(id_autor, (err, autor) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!autor) {
            res.status(404).json({ message: 'Autor no encontrado' });
            return;
        }
        res.json(autor);
    });
}

function createAutor(req, res) {
    const { nombre } = req.body;
    if (!nombre) {
        res.status(400).json({ message: 'El nombre es requerido' });
        return;
    }

    autoresModel.createAutor({ nombre }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Autor creado exitosamente', id_autor: result.insertId });
    });
}

function updateAutor(req, res) {
    const id_autor = req.params.id_autor;
    const autorData = req.body;
    autoresModel.updateAutor(id_autor, autorData, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Autor actualizado' });
    });
}

function deleteAutor(req, res) {
    const id_autor = req.params.id_autor;
    autoresModel.deleteAutor(id_autor, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Autor eliminado' });
    });
}

module.exports = {
    getAllAutores,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor
};
