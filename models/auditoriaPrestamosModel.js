// models/auditoriaPrestamosModel.js
const db = require('../db');

// Funciones del modelo de auditoría de préstamos

function getAllAuditoriaPrestamos(callback) {
    db.query('SELECT * FROM AuditoriaPrestamos', callback);
}

function getAuditoriaPrestamoById(id_auditoria, callback) {
    db.query('SELECT * FROM AuditoriaPrestamos WHERE id_auditoria = ?', [id_auditoria], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // No se encontró la auditoría
            return;
        }
        callback(null, result[0]);
    });
}

function createAuditoriaPrestamo(auditoriaData, callback) {
    db.query('INSERT INTO AuditoriaPrestamos SET ?', auditoriaData, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    getAllAuditoriaPrestamos,
    getAuditoriaPrestamoById,
    createAuditoriaPrestamo
};
