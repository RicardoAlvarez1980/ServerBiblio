const AuditoriaPrestamos = require('../models/auditoriaPrestamosModel');

function getAuditoriaPrestamos(req, res) {
  AuditoriaPrestamos.getAllAuditoriaPrestamos((err, auditoriaPrestamos) => {
    if (err) {
      console.error('Error al obtener la auditoría de préstamos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(auditoriaPrestamos);
  });
}

function getAuditoriaPrestamoById(req, res) {
  const id_auditoria = req.params.id;
  AuditoriaPrestamos.getAuditoriaPrestamoById(id_auditoria, (err, auditoriaPrestamo) => {
    if (err) {
      console.error('Error al obtener la auditoría de préstamo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (!auditoriaPrestamo) {
      res.status(404).json({ error: 'Auditoría de préstamo no encontrada' });
      return;
    }
    res.json(auditoriaPrestamo);
  });
}

function createAuditoriaPrestamo(req, res) {
  const { id_prestamo, accion } = req.body;
  AuditoriaPrestamos.createAuditoriaPrestamo(id_prestamo, accion, (err, resultado) => {
    if (err) {
      console.error('Error al crear la auditoría de préstamo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(201).json({ message: 'Auditoría de préstamo creada exitosamente', id_auditoria: resultado.insertId });
  });
}

module.exports = {
  getAuditoriaPrestamos,
  getAuditoriaPrestamoById,
  createAuditoriaPrestamo
};
