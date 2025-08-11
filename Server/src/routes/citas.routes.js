import { Router } from 'express';
import connection from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
    const sql = `
    SELECT c.id_cita AS id_cita, pa.nombre AS paciente, pa.correo AS correo, med.medico AS medico, esp.especialidad AS especialidad, c.fecha AS fecha,
    c.hora AS hora, mo.motivo AS motivo, c.descripcion AS descripcion, ubi.ubicacion AS sede, pay.metodo AS metodo, sta.estado AS status
    FROM citas c
    LEFT JOIN pacientes pa ON pa.id_paciente = c.id_paciente
    LEFT JOIN Medicos med ON med.id_medico = c.id_medico
    LEFT JOIN Especialidades esp ON esp.id_especialidad = c.id_especialidad
    LEFT JOIN Motivos mo ON mo.id_motivo = c.id_motivo
    LEFT JOIN Ubicaciones ubi ON ubi.id_ubicacion = c.id_ubicacion
    LEFT JOIN Pagos pay ON pay.id_metodo = c.id_metodo
    LEFT JOIN Estados_citas sta ON sta.id_estado = c.id_estado;
    `;
    connection.query(sql, (err,results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { id_paciente, id_medico, id_especialidad, fecha, hora, id_motivo, descripcion, id_ubicacion, id_metodo, id_estado } 
    = req.body;
    const sql = `
    INSERT INTO citas (id_paciente, id_medico, id_especialidad, fecha, hora, id_motivo, descripcion, id_ubicacion, id_metodo,
    id_estado) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(sql,
        [id_paciente, id_medico, id_especialidad, fecha, hora, id_motivo, descripcion, id_ubicacion, id_metodo, id_estado],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Cita creada', id: result.insertId });
        }
    );
})

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const { id_paciente, id_medico, id_especialidad, fecha, hora, id_motivo, descripcion, id_ubicacion, id_metodo, id_estado } 
    = req.body;
    
    const sql = `UPDATE citas SET id_paciente = ?, id_medico = ?, id_especialidad = ?, fecha = ?, hora = ?, id_motivo = ?,
        descripcion = ?, id_ubicacion = ?, id_metodo = ?, id_estado = ? WHERE id_cita = ?;`
    connection.query(sql,
        [id_paciente, id_medico, id_especialidad, fecha, hora, id_motivo, descripcion, id_ubicacion, id_metodo, id_estado, id], 
        (err,result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0){
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita actualizada correctamente' });
    });
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM citas WHERE id_cita = ?';
    connection.query(sql, [id], (err,result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0 ){
            return res.status(400).json({ message: 'Cita no encontrada'});
        }
        res.json({ message: 'Cita eliminada correctamente' });
    });
});

export default router;