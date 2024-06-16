const prestamosModel = require('../models/prestamosModel');

function getAllPrestamos(req, res) {
    prestamosModel.getAllPrestamos((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
}

function getPrestamoById(req, res) {
    const id_prestamo = req.params.id_prestamo;
    prestamosModel.getPrestamoById(id_prestamo, (err, prestamo) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!prestamo) {
            res.status(404).json({ message: 'Préstamo no encontrado' });
            return;
        }
        res.json(prestamo);
    });
}

function createPrestamo(req, res) {
    const { id_libro, id_usuario } = req.body;
    if (!id_libro || !id_usuario) {
        res.status(400).json({ message: 'Faltan datos: id_libro y id_usuario son requeridos' });
        return;
    }

    prestamosModel.createPrestamo({ id_libro, id_usuario }, (err, result) => {
        if (err) {
            if (err.sqlState === '45000') {
                res.status(400).json({ error: err.message }); // Error customizado desde el procedimiento almacenado
            } else {
                res.status(500).json({ error: err.message });
            }
            return;
        }
        res.status(201).json({ message: 'Préstamo creado exitosamente' });
    });
}

function updatePrestamo(req, res) {
    const id_prestamo = req.params.id_prestamo;
    const prestamoData = req.body;
    prestamosModel.updatePrestamo(id_prestamo, prestamoData, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Préstamo actualizado' });
    });
}

function deletePrestamo(req, res) {
    const id_prestamo = req.params.id_prestamo;
    prestamosModel.deletePrestamo(id_prestamo, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Préstamo eliminado' });
    });
}

module.exports = {
    getAllPrestamos,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
};