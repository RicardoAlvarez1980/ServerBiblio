const db = require('../db');

const AuditoriaPrestamos = {
  getAllAuditoriaPrestamos: function(callback) {
    db.query('SELECT * FROM AuditoriaPrestamos', callback);
  },

  getAuditoriaPrestamoById: function(id, callback) {
    db.query('SELECT * FROM AuditoriaPrestamos WHERE id_auditoria = ?', [id], callback);
  },

  createAuditoriaPrestamo: function(id_prestamo, accion, callback) {
    const auditoria = {
      id_prestamo: id_prestamo,
      accion: accion,
      fecha: new Date()
    };
    db.query('INSERT INTO AuditoriaPrestamos SET ?', auditoria, callback);
  }
};

module.exports = AuditoriaPrestamos;
