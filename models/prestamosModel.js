// models/prestamosModel.js
const db = require('../db');

// Funciones del modelo de préstamos

function getAllPrestamos(callback) {
    db.query('SELECT * FROM Prestamos', callback);
}

function getPrestamoById(id_prestamo, callback) {
    db.query('SELECT * FROM Prestamos WHERE id_prestamo = ?', [id_prestamo], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // No se encontró el préstamo
            return;
        }
        callback(null, result[0]);
    });
}

function createPrestamo(prestamoData, callback) {
    db.query('INSERT INTO Prestamos SET ?', prestamoData, callback);
}

function updatePrestamo(id_prestamo, prestamoData, callback) {
    db.query('UPDATE Prestamos SET ? WHERE id_prestamo = ?', [prestamoData, id_prestamo], callback);
}

function deletePrestamo(id_prestamo, callback) {
    db.query('DELETE FROM Prestamos WHERE id_prestamo = ?', [id_prestamo], callback);
}

module.exports = {
    getAllPrestamos,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
};
