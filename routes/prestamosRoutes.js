// routes/prestamosRoutes.js

const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamosController');

// Rutas para prestamos

router.get('/', prestamosController.getAllPrestamos);  // GET /api/prestamos
router.get('/:id', prestamosController.getPrestamoById); // GET /api/prestamos/:id
router.post('/', prestamosController.createPrestamo); // POST /api/prestamos
router.put('/:id', prestamosController.actualizarPrestamo);// PUT /api/prestamos/:id
router.delete('/:id', prestamosController.deletePrestamo); // DELETE /api/prestamos/:id

module.exports = router;
