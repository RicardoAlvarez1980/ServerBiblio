const db = require('../db');

// Funciones del modelo de autores

function getAllAutores(callback) {
    db.query('SELECT * FROM Autores', callback);
}

function getAutorById(id_autor, callback) {
    db.query('SELECT * FROM Autores WHERE id_autor = ?', [id_autor], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // No se encontró el autor
            return;
        }
        callback(null, result[0]);
    });
}

function createAutor(autorData, callback) {
    db.query('INSERT INTO Autores SET ?', autorData, callback);
}

function updateAutor(id_autor, autorData, callback) {
    db.query('UPDATE Autores SET ? WHERE id_autor = ?', [autorData, id_autor], callback);
}

function deleteAutor(id_autor, callback) {
    db.query('DELETE FROM Autores WHERE id_autor = ?', [id_autor], callback);
}

module.exports = {
    getAllAutores,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor
};
