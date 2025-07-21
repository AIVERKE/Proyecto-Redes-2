const http = require('http');
const mysql = require('mysql2');
const { parse } = require('url');
// Conexión a MySQL
const conexion = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'crud_node_usuarios',
  port: 3307
});

conexion.connect(err => {
  if (err) {
    console.error('Error al conectar a la BD:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

const server = http.createServer((req, res) => {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const parsedUrl = parse(req.url, true); // 👈 analiza la URL correctamente
  const pathname = parsedUrl.pathname;


  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET todos los contactos
  if (req.method === 'GET' && parsedUrl.pathname === '/contactos') {
    conexion.query('SELECT * FROM contactos', (error, results) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al obtener datos' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });

  // POST nuevo contacto
  } else if (req.method === 'POST' && parsedUrl.pathname === '/contacto') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const datos = JSON.parse(body);
        const sql = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
        conexion.query(sql, [datos.nombre, datos.email, datos.mensaje], (error, results) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al insertar en la base de datos');
            return;
          }
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.end('Formulario guardado');
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('JSON inválido');
      }
    });

  // PUT actualizar un contacto por ID
  } else if (req.method === 'PUT' && parsedUrl.pathname.startsWith('/contacto/')) {
    const id = req.url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const datos = JSON.parse(body);
        const sql = 'UPDATE contactos SET nombre = ?, email = ?, mensaje = ? WHERE id = ?';
        conexion.query(sql, [datos.nombre, datos.email, datos.mensaje, id], (error, results) => {
          if (error) {
            res.writeHead(500);
            res.end('Error al actualizar');
            return;
          }
          res.writeHead(200);
          res.end('Contacto actualizado');
        });
      } catch (err) {
        res.writeHead(400);
        res.end('JSON inválido');
      }
    });

  // DELETE eliminar un contacto por ID
  } else if (req.method === 'DELETE' && parsedUrl.pathname.startsWith('/contacto/')) {
    const id = req.url.split('/')[2];
    const sql = 'DELETE FROM contactos WHERE id = ?';
    conexion.query(sql, [id], (error, results) => {
      if (error) {
        res.writeHead(500);
        res.end('Error al eliminar');
        return;
      }
      res.writeHead(200);
      res.end('Contacto eliminado');
    });

  // Ruta no encontrada
  } else {
    res.writeHead(404);
    res.end('Ruta no encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
