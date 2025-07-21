CREATE DATABASE crud_node_usuarios;

USE crud_node_usuarios;

CREATE TABLE contactos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    mensaje TEXT DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
