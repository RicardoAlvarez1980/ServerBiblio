const db = require('../db');

// Obtener todos los préstamos
function getAllPrestamos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Prestamos', (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

// Obtener todos los préstamos listados en Auditoria-Prestamos
function getPrestamosAuditados() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.id_prestamo, p.id_libro, p.id_usuario, p.fecha_prestamo, p.fecha_devolucion,
                   CASE WHEN ap.accion = 'devolución registrada' THEN 'devuelto'
                        ELSE 'prestado'
                   END AS accion
            FROM Prestamos p
            LEFT JOIN AuditoriaPrestamos ap ON p.id_prestamo = ap.id_prestamo
            ORDER BY p.id_prestamo DESC;
        `;

        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

// Obtener préstamo por ID
function getPrestamoById(id_prestamo, callback) {
    db.query('SELECT * FROM Prestamos WHERE id_prestamo = ?', [id_prestamo], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (results.length === 0) {
            callback(null, null);
            return;
        }
        callback(null, results[0]);
    });
}

// Crear préstamo y actualizar estado del libro
function createPrestamo({ id_libro, id_usuario }, callback) {
    db.beginTransaction(function(err) {
        if (err) {
            callback(err);
            return;
        }

        db.query('CALL registrar_prestamo(?, ?, CURDATE())', [id_libro, id_usuario], function(err, results) {
            if (err) {
                db.rollback(function() {
                    callback(err);
                });
                return;
            }

            db.query('UPDATE Libros SET estado = "prestado" WHERE id_libro = ?', [id_libro], function(err, updateResult) {
                if (err) {
                    db.rollback(function() {
                        callback(err);
                    });
                    return;
                }

                db.commit(function(err) {
                    if (err) {
                        db.rollback(function() {
                            callback(err);
                        });
                        return;
                    }
                    callback(null, results);
                });
            });
        });
    });
}

// Actualizar préstamo
function updatePrestamo(id_prestamo, prestamoData, callback) {
    db.query('UPDATE Prestamos SET ? WHERE id_prestamo = ?', [prestamoData, id_prestamo], callback);
}

// Eliminar préstamo
function deletePrestamo(id_prestamo, callback) {
    db.query('DELETE FROM Prestamos WHERE id_prestamo = ?', [id_prestamo], callback);
}

module.exports = {
    getAllPrestamos,
    getPrestamosAuditados,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
};
