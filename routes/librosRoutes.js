// routes/librosRoutes.js
const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');

// Rutas para libros
router.get('/', librosController.getLibros);
router.get('/:id', librosController.getLibroById);
router.post('/', librosController.createLibro);
router.put('/:id', librosController.updateLibro);
router.delete('/:id', librosController.deleteLibro);

module.exports = router;
