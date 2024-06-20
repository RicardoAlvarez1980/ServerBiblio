-- Inserciones para la tabla Autores
INSERT INTO Autores (nombre) VALUES
('Gabriel García Márquez'),
('Jane Austen'),
('Fyodor Dostoevsky'),
('J.K. Rowling'),
('Haruki Murakami');

-- Inserciones para la tabla Libros
-- Libros de Gabriel García Márquez
INSERT INTO Libros (titulo, id_autor, estado) VALUES
('Cien años de soledad', 1, 'disponible'),
('El amor en los tiempos del cólera', 1, 'disponible'),
('Crónica de una muerte anunciada', 1, 'disponible'),
('La hojarasca', 1, 'disponible'),
('Memoria de mis putas tristes', 1, 'disponible');

-- Libros de Jane Austen
INSERT INTO Libros (titulo, id_autor, estado) VALUES
('Orgullo y prejuicio', 2, 'disponible'),
('Sentido y sensibilidad', 2, 'disponible'),
('Emma', 2, 'disponible'),
('Persuasión', 2, 'disponible'),
('Mansfield Park', 2, 'disponible');

-- Libros de Fyodor Dostoevsky
INSERT INTO Libros (titulo, id_autor, estado) VALUES
('Crimen y castigo', 3, 'disponible'),
('El idiota', 3, 'disponible'),
('Los hermanos Karamázov', 3, 'disponible'),
('El jugador', 3, 'disponible'),
('Memorias del subsuelo', 3, 'disponible');

-- Libros de J.K. Rowling
INSERT INTO Libros (titulo, id_autor, estado) VALUES
('Harry Potter y la piedra filosofal', 4, 'disponible'),
('Harry Potter y la cámara secreta', 4, 'disponible'),
('Harry Potter y el prisionero de Azkaban', 4, 'disponible'),
('Harry Potter y el cáliz de fuego', 4, 'disponible'),
('Harry Potter y la Orden del Fénix', 4, 'disponible');

-- Libros de Haruki Murakami
INSERT INTO Libros (titulo, id_autor, estado) VALUES
('Tokio blues (Norwegian Wood)', 5, 'disponible'),
('1Q84', 5, 'disponible'),
('Kafka en la orilla', 5, 'disponible'),
('Al sur de la frontera, al oeste del sol', 5, 'disponible'),
('Sputnik, mi amor', 5, 'disponible');


-- Inserciones para la tabla Bibliotecario
INSERT INTO Bibliotecario (id_bibliotecario, nombre, email) VALUES
(1, 'Martín Pérez', 'martin.perez@example.com'),
(2, 'Lucía Rodríguez', 'lucia.rodriguez@example.com'),
(3, 'Juan García', 'juan.garcia@example.com'),
(4, 'María López', 'maria.lopez@example.com'),
(5, 'Pedro Martínez', 'pedro.martinez@example.com');

-- Inserciones para la tabla Usuarios
INSERT INTO Usuarios (id_usuario, nombre, email) VALUES
(1, 'Juan Pérez', 'juanperez@example.com'),
(2, 'María García', 'mariagarcia@example.com'),
(3, 'Luis Rodríguez', 'luisrodriguez@example.com'),
(4, 'Ana Martínez', 'anamartinez@example.com'),
(5, 'Carlos López', 'carloslopez@example.com'),
(6, 'Laura Sánchez', 'laurasanchez@example.com'),
(7, 'Diego Fernández', 'diegofernandez@example.com'),
(8, 'Valentina Gómez', 'valentinagomez@example.com'),
(9, 'Santiago González', 'santiagogonzalez@example.com'),
(10, 'Julieta Torres', 'julietatorres@example.com');

-- Inserciones para la tabla Prestamos
CALL registrar_prestamo(p_id_libro, p_id_usuario, p_fecha_prestamo);

-- Inserciones para la tabla Prestamos (Devoluciones)
CALL registrar_devolucion(p_id_prestamo);
