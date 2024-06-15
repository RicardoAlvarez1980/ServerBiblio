// controllers/prestamosController.js
const Prestamos = require('../models/prestamosModel');

// Controladores de préstamos

function getPrestamos(req, res) {
    Prestamos.getAllPrestamos((err, prestamos) => {
        if (err) {
            console.error('Error al obtener los préstamos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(prestamos);
    });
}

function getPrestamoById(req, res) {
    const id_prestamo = req.params.id;
    Prestamos.getPrestamoById(id_prestamo, (err, prestamo) => {
        if (err) {
            console.error('Error al obtener el préstamo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (!prestamo) {
            res.status(404).json({ error: 'Préstamo no encontrado' });
            return;
        }
        res.json(prestamo);
    });
}

function createPrestamo(req, res) {
    const nuevoPrestamo = req.body;
    Prestamos.createPrestamo(nuevoPrestamo, (err, resultado) => {
        if (err) {
            console.error('Error al crear el préstamo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Préstamo creado exitosamente', id_prestamo: resultado.insertId });
    });
}

function updatePrestamo(req, res) {
    const id_prestamo = req.params.id;
    const prestamoData = req.body;
    Prestamos.updatePrestamo(id_prestamo, prestamoData, (err, resultado) => {
        if (err) {
            console.error('Error al actualizar el préstamo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Préstamo no encontrado' });
            return;
        }
        res.json({ message: 'Préstamo actualizado exitosamente' });
    });
}

function deletePrestamo(req, res) {
    const id_prestamo = req.params.id;
    Prestamos.deletePrestamo(id_prestamo, (err, resultado) => {
        if (err) {
            console.error('Error al eliminar el préstamo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Préstamo no encontrado' });
            return;
        }
        res.json({ message: 'Préstamo eliminado exitosamente' });
    });
}

module.exports = {
    getPrestamos,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
};
