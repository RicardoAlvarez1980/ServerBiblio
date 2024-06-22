// models/librosModel.js
const db = require('../db');

// Funciones del modelo de libros

function getAllLibros(callback) {
    db.query('SELECT * FROM Libros', callback);
}

function getLibroById(id_libro, callback) {
    db.query('SELECT * FROM Libros WHERE id_libro = ?', [id_libro], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // No se encontró el libro
            return;
        }
        callback(null, result[0]);
    });
}

function createLibro(libroData, callback) {
    db.query('INSERT INTO Libros SET ?', libroData, callback);
}

function updateLibro(id_libro, libroData, callback) {
    db.query('UPDATE Libros SET ? WHERE id_libro = ?', [libroData, id_libro], callback);
}

function deleteLibro(id_libro, callback) {
    db.query('DELETE FROM Libros WHERE id_libro = ?', [id_libro], callback);
}

module.exports = {
    getAllLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro
};
