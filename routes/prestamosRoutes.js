const express = require('express');
const prestamosController = require('../controllers/prestamosController');
const router = express.Router();

router.get('/', prestamosController.getAllPrestamos);
router.get('/:id_prestamo', prestamosController.getPrestamoById);
router.post('/', prestamosController.createPrestamo);
router.put('/:id_prestamo', prestamosController.updatePrestamo);
router.delete('/:id_prestamo', prestamosController.deletePrestamo);

module.exports = router;
