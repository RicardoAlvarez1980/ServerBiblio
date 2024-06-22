// controllers/usuariosController.js
const Usuarios = require('../models/usuariosModel');

// Controladores de usuarios

function getUsuarios(req, res) {
    Usuarios.getAllUsuarios((err, usuarios) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(usuarios);
    });
}

function getUsuarioById(req, res) {
    const id_usuario = req.params.id;
    Usuarios.getUsuarioById(id_usuario, (err, usuario) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(usuario);
    });
}

function createUsuario(req, res) {
    const nuevoUsuario = req.body;
    Usuarios.createUsuario(nuevoUsuario, (err, resultado) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Usuario creado exitosamente', id_usuario: resultado.insertId });
    });
}

function updateUsuario(req, res) {
    const id_usuario = req.params.id;
    const usuarioData = req.body;
    Usuarios.updateUsuario(id_usuario, usuarioData, (err, resultado) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
}

function deleteUsuario(req, res) {
    const id_usuario = req.params.id;
    Usuarios.deleteUsuario(id_usuario, (err, resultado) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
