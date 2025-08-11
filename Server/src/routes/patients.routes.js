// src/routes/patients.routes.js
import { Router } from 'express';
import connection from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM pacientes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/', (req, res) =>{
    const { nombre, correo } = req.body;
    if (!nombre || !correo) {
        return res.status(400).json({ error: 'Faltan datos requeridos'})
    }

    const sql = 'INSERT INTO pacientes (nombre, correo) VALUES (?, ?)';
    connection.query(sql, [nombre, correo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({message: 'Paciente creado', id: result.insertId });
    });
});

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    
    const sql = 'UPDATE pacientes SET nombre = ?, correo = ? WHERE id_paciente = ?';
    connection.query(sql, [nombre, correo, id], (err,result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0){
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json({ message: 'Paciente actualizado correctamente' });
    });
});

// Otra forma, más dinámica y escalable:
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { nombre, edad, direccion } = req.body;

//   // Validar que al menos un campo venga para actualizar
//   if (!nombre && !edad && !direccion) {
//     return res.status(400).json({ error: 'Debe enviar al menos un campo para actualizar' });
//   }

//   // Armar dinámicamente la consulta y los valores para actualizar
//   const fields = [];
//   const values = [];

//   if (nombre) {
//     fields.push('nombre = ?');
//     values.push(nombre);
//   }
//   if (edad) {
//     fields.push('edad = ?');
//     values.push(edad);
//   }
//   if (direccion) {
//     fields.push('direccion = ?');
//     values.push(direccion);
//   }

//   // Agregar el id para el WHERE
//   values.push(id);

//   const sql = `UPDATE pacientes SET ${fields.join(', ')} WHERE id = ?`;

//   connection.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Paciente no encontrado' });
//     }
//     res.json({ message: 'Paciente actualizado correctamente' });
//   });
// });

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pacientes WHERE id_paciente = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0 ){
            return res.status(400).json({ message: 'Paciente no encontrado' })
        }
        res.json({ message: 'Paciente eliminado correctamente' });
    });
});

export default router;
