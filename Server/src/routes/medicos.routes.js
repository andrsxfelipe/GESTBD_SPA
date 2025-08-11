import { Router } from 'express';
import connection from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
    const sql = `
        SELECT m.medico,
        GROUP_CONCAT(e.especialidad SEPARATOR ',') AS especialidades
        FROM medicos_especialidad me
        LEFT JOIN Medicos m ON m.id_medico = me.id_medico
        LEFT JOIN Especialidades e ON e.id_especialidad = me.id_especialidad
        GROUP BY m.medico;
        `;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { medico } = req.body;
    connection.query('SELECT id_medico FROM Medicos WHERE medico = ?', [medico], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0){
            return res.status(400).json({ error: 'El medico ya existe' });
        }
        connection.query('INSERT INTO Medicos(medico) VALUES (?)', [medico], (err, result) => {
            if (err) return res.status(500).json({ error:err.message });
            return res.status(201).json({ message: 'Medico agregado, agregar especialidades', id:result.insertId });
        });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { medico } = req.body;

  // 1. Verificar si existe otro médico con el mismo nombre (excluyendo el actual)
  const checkSql = 'SELECT id_medico FROM Medicos WHERE medico = ? AND id_medico <> ?';
  connection.query(checkSql, [medico, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      // Otro médico ya tiene ese nombre
      return res.status(400).json({ error: 'El nombre del médico ya está en uso' });
    }

    // 2. Actualizar el médico
    const updateSql = 'UPDATE Medicos SET medico = ? WHERE id_medico = ?';
    connection.query(updateSql, [medico, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }
      res.json({ message: 'Médico actualizado correctamente' });
    });
  });
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    connection.query('DELETE FROM Medicos WHERE id_medico = ?', [id], (err,result) => {
        if (err){
            if (err.errno === 1451 ){
                return res.status(400).json({ message: 'El médico no se puede eliminar si tiene especialidades o citas asociadas, si no tiene citas asociadas, elimine las especialidades para eliminarlo.' });
            }
            return res.status(500).json({ error: err.message });
        } 
        if (result.affectedRows === 0){
            return res.status(400).json({ message: 'Medico no encontrado' })
        }
        res.json({ message: 'Medico eliminado' })
    })
})


export default router;