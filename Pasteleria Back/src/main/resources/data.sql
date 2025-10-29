-- ROLES
INSERT INTO roles (id, nombre) VALUES (1, 'ADMIN');
INSERT INTO roles (id, nombre) VALUES (2, 'VENDEDOR');
INSERT INTO roles (id, nombre) VALUES (3, 'DELIVERY');

-- USUARIO ADMIN
-- Password encriptado con BCrypt: admin123
INSERT INTO usuarios (id, nombre, email, password, rol_id)
VALUES (1, 'Andre Perez', 'admin@pasteleria.com',
        '$2a$10$47Jzqtc52KOceWAU3PU/uO/NcfVUQl7r3n2/XNUtxjXKF8UaNwqEm', 1);

-- CATEGORÍAS DE PRODUCTOS
INSERT INTO categorias (id, nombre) VALUES (1, 'Panes');
INSERT INTO categorias (id, nombre) VALUES (2, 'Postres');
INSERT INTO categorias (id, nombre) VALUES (3, 'Cuchareables');
INSERT INTO categorias (id, nombre) VALUES (4, 'Tortas');

-- PRODUCTOS INICIALES
-- Panes
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (1, 'Pan Francés', 0.50, 100, 1);
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (2, 'Pan Integral', 0.80, 80, 1);
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (3, 'Croissant', 1.20, 50, 1);

-- Postres
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (4, 'Pie de Limón', 15.00, 10, 2);
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (5, 'Cheesecake', 18.00, 8, 2);

-- Cuchareables
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (6, 'Arroz con Leche', 3.50, 20, 3);
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (7, 'Mousse de Chocolate', 4.50, 15, 3);

-- Tortas
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (8, 'Torta de Chocolate', 25.00, 5, 4);
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (9, 'Torta de Fresa', 28.00, 4, 4);
INSERT INTO productos (id, nombre, precio, stock, categoria_id) VALUES (10, 'Torta Tres Leches', 30.00, 3, 4);