const db = require('../db');

function getAllBibliotecarios(callback) {
    db.query('SELECT * FROM Bibliotecario', callback);
}

function getBibliotecarioById(id_bibliotecario, callback) {
    db.query('SELECT * FROM Bibliotecario WHERE id_bibliotecario = ?', [id_bibliotecario], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // No se encontró el bibliotecario
            return;
        }
        callback(null, result[0]);
    });
}

function createBibliotecario(bibliotecarioData, callback) {
    db.query('INSERT INTO Bibliotecario SET ?', bibliotecarioData, callback);
}

function updateBibliotecario(id_bibliotecario, bibliotecarioData, callback) {
    db.query('UPDATE Bibliotecario SET ? WHERE id_bibliotecario = ?', [bibliotecarioData, id_bibliotecario], callback);
}

function deleteBibliotecario(id_bibliotecario, callback) {
    db.query('DELETE FROM Bibliotecario WHERE id_bibliotecario = ?', [id_bibliotecario], callback);
}

module.exports = {
    getAllBibliotecarios,
    getBibliotecarioById,
    createBibliotecario,
    updateBibliotecario,
    deleteBibliotecario
};
