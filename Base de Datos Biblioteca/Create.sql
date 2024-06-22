-- Archivo: create.sql

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS biblioPractica;
USE biblioPractica;

-- Tabla Autores
CREATE TABLE Autores (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla Libros
CREATE TABLE Libros (
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    id_autor INT,
    estado ENUM('disponible', 'prestado') DEFAULT 'disponible',
    FOREIGN KEY (id_autor) REFERENCES Autores(id_autor)
);

-- Tabla Bibliotecario
CREATE TABLE Bibliotecario (
    id_bibliotecario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);

-- Tabla Prestamos
CREATE TABLE Prestamos (
    id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    id_libro INT,
    id_usuario INT,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    FOREIGN KEY (id_libro) REFERENCES Libros(id_libro),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla AuditoriaPrestamos
CREATE TABLE AuditoriaPrestamos (
    id_auditoria INT PRIMARY KEY AUTO_INCREMENT,
    id_prestamo INT,
    accion VARCHAR(255),
    fecha DATE,
    FOREIGN KEY (id_prestamo) REFERENCES Prestamos(id_prestamo) ON DELETE CASCADE
);