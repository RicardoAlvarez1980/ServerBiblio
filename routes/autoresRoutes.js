const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autoresController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', autoresController.getAllAutores);
router.get('/:id_autor', autoresController.getAutorById);
router.post('/', autoresController.createAutor);
router.put('/:id_autor', autoresController.updateAutor);
router.delete('/:id_autor', autoresController.deleteAutor);

module.exports = router;
