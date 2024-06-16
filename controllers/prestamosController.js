const prestamosModel = require('../models/prestamosModel');

// Obtener todos los préstamos
async function getAllPrestamos(req, res) {
    try {
        const prestamos = await prestamosModel.getAllPrestamos();
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener préstamo por ID
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

// Obtener préstamos devueltos o no devueltos
function getPrestamosByEstado(req, res) {
    const devuelto = req.query.devuelto;

    if (devuelto === undefined || devuelto === '') {
        return res.status(400).json({ message: 'Parámetro devuelto es requerido y debe ser true o false' });
    }

    prestamosModel.getPrestamosByEstado(devuelto === 'true', (err, prestamos) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(prestamos);
    });
}

// Crear préstamo
function createPrestamo(req, res) {
    const { id_libro, id_usuario } = req.body;

    if (!id_libro || !id_usuario) {
        return res.status(400).json({ message: 'Faltan datos: id_libro y id_usuario son requeridos' });
    }

    prestamosModel.createPrestamo({ id_libro, id_usuario }, (err, result) => {
        if (err) {
            if (err.sqlState === '45000') {
                res.status(400).json({ error: err.message }); // Error personalizado desde el procedimiento almacenado
            } else {
                res.status(500).json({ error: err.message });
            }
            return;
        }
        res.status(201).json({ message: 'Préstamo creado exitosamente' });
    });
}

// Actualizar préstamo
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

// Eliminar préstamo
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
    getPrestamosByEstado,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
};
