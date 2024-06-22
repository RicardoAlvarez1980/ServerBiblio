-- Archivo: functions.sql
-- PROCEDURES

DELIMITER //

CREATE PROCEDURE registrar_prestamo (
    IN p_id_libro INT,
    IN p_id_usuario INT,
    IN p_fecha_prestamo DATE
)
BEGIN
    DECLARE libro_disponible INT;

    -- Verificar si el libro está disponible
    SELECT COUNT(*)
    INTO libro_disponible
    FROM Prestamos
    WHERE id_libro = p_id_libro
      AND fecha_devolucion IS NULL;

    IF libro_disponible = 0 THEN
        -- Registrar el préstamo
        INSERT INTO Prestamos (id_libro, id_usuario, fecha_prestamo)
        VALUES (p_id_libro, p_id_usuario, p_fecha_prestamo);

        -- Actualizar el estado del libro a 'prestado'
        UPDATE Libros
        SET estado = 'prestado'
        WHERE id_libro = p_id_libro;

        -- Registrar en la auditoría
        INSERT INTO AuditoriaPrestamos (id_prestamo, accion, fecha)
        VALUES (LAST_INSERT_ID(), 'préstamo registrado', CURRENT_DATE); -- Utiliza DATE() para obtener solo la fecha
        
        SELECT 'Préstamo registrado exitosamente.' AS mensaje;
    ELSE
        SELECT 'El libro solicitado no está disponible para préstamo.' AS mensaje;
    END IF;
END //


-- VISTAS
-- Vista: vista_prestamos_actuales
CREATE VIEW vista_prestamos_actuales AS
SELECT L.titulo AS nombre_libro, U.nombre AS nombre_usuario, P.fecha_prestamo
FROM Prestamos P
JOIN Libros L ON P.id_libro = L.id_libro
JOIN Usuarios U ON P.id_usuario = U.id_usuario
WHERE P.fecha_devolucion IS NULL;

--TRIGGERS
-- Trigger: actualizar_fecha_devolucion

DELIMITER //

CREATE TRIGGER actualizar_fecha_devolucion
BEFORE UPDATE ON Prestamos
FOR EACH ROW
BEGIN
    -- Verificar si la fecha de devolución ha cambiado y es la primera vez que se establece
    IF NEW.fecha_devolucion IS NOT NULL AND OLD.fecha_devolucion IS NULL THEN
        -- Actualizar el estado del libro a "disponible"
        UPDATE Libros
        SET estado = 'disponible'
        WHERE id_libro = (SELECT id_libro FROM Prestamos WHERE id_prestamo = NEW.id_prestamo);

        -- Insertar en AuditoriaPrestamos
        INSERT INTO AuditoriaPrestamos (id_prestamo, accion, fecha)
        VALUES (NEW.id_prestamo, 'devolución registrada', CURDATE());
    END IF;
END //

DELIMITER ;