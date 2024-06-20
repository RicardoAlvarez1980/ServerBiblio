// models/prestamosModel.js

const db = require('../db');

// Funciones del modelo de prestamos

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

// Función para llamar al procedimiento almacenado registrar_prestamo
function createPrestamo(idLibro, idUsuario, callback) {
    db.query(
        'CALL registrar_prestamo(?, ?, CURDATE())',
        [idLibro, idUsuario],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            // Puedes manejar los resultados del procedimiento almacenado aquí si es necesario
            callback(null, results);
        }
    );
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
