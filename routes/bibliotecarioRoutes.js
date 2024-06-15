// routes/bibliotecarioRoutes.js

const express = require('express');
const router = express.Router();
const bibliotecarioController = require('../controllers/bibliotecarioController');

// Rutas para bibliotecarios
router.get('/', bibliotecarioController.getAllBibliotecarios);
router.get('/:id', bibliotecarioController.getBibliotecarioById);
router.post('/', bibliotecarioController.createBibliotecario);

module.exports = router;
