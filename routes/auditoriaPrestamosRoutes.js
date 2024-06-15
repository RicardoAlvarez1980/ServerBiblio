const express = require('express');
const router = express.Router();
const auditoriaPrestamosController = require('../controllers/auditoriaPrestamosController');

// Rutas para auditoría de préstamos
router.get('/', auditoriaPrestamosController.getAuditoriaPrestamos);
router.get('/:id', auditoriaPrestamosController.getAuditoriaPrestamoById);
router.post('/', auditoriaPrestamosController.createAuditoriaPrestamo);

module.exports = router;
