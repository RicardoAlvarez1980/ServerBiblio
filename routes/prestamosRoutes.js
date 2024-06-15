// routes/prestamosRoutes.js
const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamosController');

// Rutas para préstamos
router.get('/', prestamosController.getPrestamos);
router.get('/:id', prestamosController.getPrestamoById);
router.post('/', prestamosController.createPrestamo);
router.put('/:id', prestamosController.updatePrestamo);
router.delete('/:id', prestamosController.deletePrestamo);

module.exports = router;
