CREATE DATABASE crud_node_usuarios;

USE crud_node_usuarios;

CREATE TABLE contactos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    mensaje TEXT DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO contactos (nombre, email, mensaje)
VALUES 
  ('Ana Pérez', 'ana.perez@example.com', 'Hola, me gustaría saber más sobre sus servicios.'),
  ('Luis Rodríguez', 'luis.r@example.com', '¿Tienen soporte técnico disponible los fines de semana?'),
  ('María Gómez', 'maria.gomez@example.com', 'Gracias por la rápida respuesta. ¡Muy buen servicio!'),
  ('Carlos Díaz', 'carlos.diaz@example.com', '¿Pueden enviarme un presupuesto personalizado?');
