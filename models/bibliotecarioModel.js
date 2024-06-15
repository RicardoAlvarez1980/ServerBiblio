// models/bibliotecarioModel.js

const db = require('../db');

// Obtener todos los bibliotecarios
exports.getAllBibliotecarios = (callback) => {
    db.query('SELECT * FROM Bibliotecario', callback);
};

// Obtener un bibliotecario por ID
exports.getBibliotecarioById = (id, callback) => {
    db.query('SELECT * FROM Bibliotecario WHERE id_bibliotecario = ?', id, callback);
};

// Crear un nuevo bibliotecario
exports.createBibliotecario = (bibliotecarioData, callback) => {
    db.query('INSERT INTO Bibliotecario SET ?', bibliotecarioData, callback);
};
