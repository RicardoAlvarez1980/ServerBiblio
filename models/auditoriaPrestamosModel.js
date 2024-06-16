// models/auditoriaPrestamosModel.js

const db = require('../db');

// Obtener todas las auditorías de préstamos
function getAllAuditoriaPrestamos(callback) {
    const sql = 'SELECT * FROM AuditoriaPrestamos';
    db.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Obtener una auditoría de préstamo por su ID
function getAuditoriaPrestamoById(id, callback) {
    const sql = 'SELECT * FROM AuditoriaPrestamos WHERE id_auditoria = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result[0]); // Tomamos el primer resultado porque esperamos solo un resultado
    });
}

// Crear una nueva auditoría de préstamo
function createAuditoriaPrestamo(auditoria, callback) {
    const { id_prestamo, accion } = auditoria;
    const sql = 'INSERT INTO AuditoriaPrestamos (id_prestamo, accion) VALUES (?, ?)';
    db.query(sql, [id_prestamo, accion], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Actualizar una auditoría de préstamo por su ID
function updateAuditoriaPrestamo(id, auditoria, callback) {
    const { id_prestamo, accion } = auditoria;
    const sql = 'UPDATE AuditoriaPrestamos SET id_prestamo = ?, accion = ? WHERE id_auditoria = ?';
    db.query(sql, [id_prestamo, accion, id], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Eliminar una auditoría de préstamo por su ID
function deleteAuditoriaPrestamo(id, callback) {
    const sql = 'DELETE FROM AuditoriaPrestamos WHERE id_auditoria = ?';
    db.query(sql, [id], (err, result) => {
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
    createAuditoriaPrestamo,
    updateAuditoriaPrestamo,
    deleteAuditoriaPrestamo
};
