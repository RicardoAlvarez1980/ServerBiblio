// controllers/prestamosController.js

const Prestamo = require('../models/prestamosModel');
const db = require('../db');

// Controladores de prestamos

function getAllPrestamos(req, res) {
    Prestamo.getAllPrestamos((err, prestamos) => {
        if (err) {
            console.error('Error al obtener los préstamos: ', err);
            return res.status(500).send('Error al obtener los préstamos');
        }
        res.json(prestamos);
    });
}

function getPrestamoById(req, res) {
    const { id } = req.params;
    Prestamo.getPrestamoById(id, (err, prestamo) => {
        if (err) {
            console.error('Error al obtener el préstamo: ', err);
            return res.status(500).send('Error al obtener el préstamo');
        }
        if (!prestamo) {
            return res.status(404).send('Préstamo no encontrado');
        }
        res.json(prestamo);
    });
}

function createPrestamo(req, res) {
    const { id_libro, id_usuario } = req.body;
    const fecha_prestamo = new Date().toISOString().slice(0, 10); // Obtén la fecha actual en formato YYYY-MM-DD

    // Llama al procedimiento almacenado registrar_prestamo con la fecha actual del sistema
    const query = 'CALL registrar_prestamo(?, ?, ?)';
    const params = [id_libro, id_usuario, fecha_prestamo];

    db.query(query, params, (error, results) => {
        if (error) {
            console.error('Error al crear el préstamo: ', error);
            return res.status(500).send('Error al crear el préstamo');
        }

        if (results && results.length > 0) {
            const mensaje = results[0][0].mensaje; // El nombre del campo puede variar según el procedimiento almacenado
            res.status(201).send(mensaje);
        } else {
            res.status(500).send('Error al crear el préstamo: no se recibió respuesta válida del procedimiento almacenado');
        }
    });
}

// Función para actualizar un préstamo
function actualizarPrestamo(req, res) {
    const { id } = req.params; // Obtener el ID del préstamo de los parámetros de la ruta
    const prestamoData = req.body; // Obtener los datos a actualizar del cuerpo de la solicitud

    Prestamo.updatePrestamo(id, prestamoData, (err, result) => {
        if (err) {
            console.error('Error al actualizar el préstamo: ', err);
            return res.status(500).send('Error al actualizar el préstamo');
        }
        res.status(200).send('Préstamo actualizado correctamente');
    });
}



function deletePrestamo(req, res) {
    const { id } = req.params;
    Prestamo.deletePrestamo(id, (err, result) => {
        if (err) {
            console.error('Error al eliminar el préstamo: ', err);
            return res.status(500).send('Error al eliminar el préstamo');
        }
        res.status(200).send('Préstamo eliminado correctamente');
    });
}

module.exports = {
    getAllPrestamos,
    getPrestamoById,
    createPrestamo,
    actualizarPrestamo,
    deletePrestamo
};
