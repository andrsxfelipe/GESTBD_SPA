// src/config/db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'idQ6kwx+',
    database: 'prueba1'
});

connection.connect(err => {
    if (err) {
        console.error('Hubo un error al conectarse con MySQL:', err.message);
    } else {
        console.log('Conexión exitosa a MySQL');
    }
});

export default connection;
