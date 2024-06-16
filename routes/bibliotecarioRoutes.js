const express = require('express');
const router = express.Router();
const bibliotecarioController = require('../controllers/bibliotecarioController');

router.get('/', bibliotecarioController.getAllBibliotecarios);
router.get('/:id_bibliotecario', bibliotecarioController.getBibliotecarioById);
router.post('/', bibliotecarioController.createBibliotecario);
router.put('/:id_bibliotecario', bibliotecarioController.updateBibliotecario);
router.delete('/:id_bibliotecario', bibliotecarioController.deleteBibliotecario);

module.exports = router;
