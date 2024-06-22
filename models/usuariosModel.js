// models/usuariosModel.js
const db = require('../db');

// Funciones del modelo de usuarios

function getAllUsuarios(callback) {
    db.query('SELECT * FROM Usuarios', callback);
}

function getUsuarioById(id_usuario, callback) {
    db.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            callback(null, null); // No se encontró el usuario
            return;
        }
        callback(null, result[0]);
    });
}

function createUsuario(usuarioData, callback) {
    db.query('INSERT INTO Usuarios SET ?', usuarioData, callback);
}

function updateUsuario(id_usuario, usuarioData, callback) {
    db.query('UPDATE Usuarios SET ? WHERE id_usuario = ?', [usuarioData, id_usuario], callback);
}

function deleteUsuario(id_usuario, callback) {
    db.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id_usuario], callback);
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
