const db = require('../db'); // Importa el objeto de base de datos

// Obtener todos los registros de auditoría de préstamos
exports.getAuditoriaPrestamos = (req, res) => {
    db.query('SELECT * FROM AuditoriaPrestamos', (err, results) => {
        if (err) {
            console.error('Error al obtener auditoría de préstamos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results); // Enviar resultados como JSON
    });
};

// Obtener un registro de auditoría de préstamo por ID
exports.getAuditoriaPrestamoById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM AuditoriaPrestamos WHERE id_auditoria = ?', id, (err, results) => {
        if (err) {
            console.error('Error al obtener auditoría de préstamo por ID:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Auditoría de préstamo no encontrada' });
            return;
        }
        res.json(results[0]); // Enviar el primer resultado encontrado
    });
};

// Crear un nuevo registro de auditoría de préstamo
exports.createAuditoriaPrestamo = (req, res) => {
    const { id_prestamo, accion } = req.body;
    db.query('INSERT INTO AuditoriaPrestamos (id_prestamo, accion) VALUES (?, ?)', [id_prestamo, accion], (err, result) => {
        if (err) {
            console.error('Error al crear auditoría de préstamo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Auditoría de préstamo creada exitosamente', id: result.insertId });
    });
};
