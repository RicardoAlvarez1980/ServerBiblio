-- Archivo: functions.sql

-- Vista: vista_prestamos_actuales
CREATE VIEW vista_prestamos_actuales AS
SELECT L.titulo AS nombre_libro, U.nombre AS nombre_usuario, P.fecha_prestamo
FROM Prestamos P
JOIN Libros L ON P.id_libro = L.id_libro
JOIN Usuarios U ON P.id_usuario = U.id_usuario
WHERE P.fecha_devolucion IS NULL;

-- Procedimiento registrar_prestamo
DELIMITER //

CREATE PROCEDURE registrar_prestamo (
    IN p_id_libro INT,
    IN p_id_usuario INT
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
        -- Registrar el préstamo con fecha actual del sistema
        INSERT INTO Prestamos (id_libro, id_usuario, fecha_prestamo)
        VALUES (p_id_libro, p_id_usuario, CURDATE());

        -- Actualizar el estado del libro a 'prestado'
        UPDATE Libros
        SET estado = 'prestado'
        WHERE id_libro = p_id_libro;
        
        SELECT 'Préstamo registrado exitosamente.' AS mensaje;
    ELSE
        SELECT 'El libro solicitado no está disponible para préstamo.' AS mensaje;
    END IF;
END //

DELIMITER ;


-- Procedimiento registrar_devolucion
DELIMITER //

CREATE PROCEDURE registrar_devolucion (
    IN p_id_prestamo INT
)
BEGIN
    DECLARE existe_prestamo INT DEFAULT 0;
    DECLARE error_message VARCHAR(255);

    -- Verificar si el préstamo existe
    SELECT COUNT(*)
    INTO existe_prestamo
    FROM Prestamos
    WHERE id_prestamo = p_id_prestamo;

    IF existe_prestamo = 0 THEN
        SET error_message = 'El préstamo especificado no existe.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    ELSE
        BEGIN
            -- Iniciar la transacción
            START TRANSACTION;

            -- Actualizar la fecha de devolución
            UPDATE Prestamos
            SET fecha_devolucion = CURDATE()
            WHERE id_prestamo = p_id_prestamo;

            -- Actualizar el estado del libro a "disponible"
            UPDATE Libros
            SET estado = 'disponible'
            WHERE id_libro = (SELECT id_libro FROM Prestamos WHERE id_prestamo = p_id_prestamo);

            -- Commit de la transacción
            COMMIT;
            SELECT 'Devolución registrada exitosamente.' AS mensaje;
        END;
    END IF;
END //

DELIMITER ;
