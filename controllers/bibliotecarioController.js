const bibliotecarioModel = require('../models/bibliotecarioModel');

function getAllBibliotecarios(req, res) {
    bibliotecarioModel.getAllBibliotecarios((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
}

function getBibliotecarioById(req, res) {
    const id_bibliotecario = req.params.id_bibliotecario;
    bibliotecarioModel.getBibliotecarioById(id_bibliotecario, (err, bibliotecario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!bibliotecario) {
            res.status(404).json({ message: 'Bibliotecario no encontrado' });
            return;
        }
        res.json(bibliotecario);
    });
}

function createBibliotecario(req, res) {
    const bibliotecarioData = req.body;
    bibliotecarioModel.createBibliotecario(bibliotecarioData, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Bibliotecario creado exitosamente' });
    });
}

function updateBibliotecario(req, res) {
    const id_bibliotecario = req.params.id_bibliotecario;
    const bibliotecarioData = req.body;
    bibliotecarioModel.updateBibliotecario(id_bibliotecario, bibliotecarioData, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Bibliotecario actualizado' });
    });
}

function deleteBibliotecario(req, res) {
    const id_bibliotecario = req.params.id_bibliotecario;
    bibliotecarioModel.deleteBibliotecario(id_bibliotecario, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Bibliotecario eliminado' });
    });
}

module.exports = {
    getAllBibliotecarios,
    getBibliotecarioById,
    createBibliotecario,
    updateBibliotecario,
    deleteBibliotecario
};
