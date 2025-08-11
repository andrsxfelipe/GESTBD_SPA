import { Router } from 'express';
import connection from '../config/db.js';
import { connect } from 'http2';

const router = Router();

router.post('/', (req, res) => {
    const { id_medico, id_especialidad } = req.body; 
    connection.query('INSERT INTO Medicos_especialidad(id_medico, id_especialidad) VALUES (?,?)',
        [id_medico,id_especialidad], (err, result) => {
        if (err){
            if (err.errno === 1062) {
                return res.status(400).json({ error: 'La especialidad ya está asignada a este médico' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({message: 'Especialidad agregada'});
    });
});

router.delete('/', (req, res) => {
    const { id_medico, id_especialidad } = req.body;
    const sql = 'DELETE FROM Medicos_especialidad WHERE id_medico = ? AND id_especialidad = ?';
    connection.query(sql, [id_medico, id_especialidad], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.affectedRows === 0 ){ 
            return res.status(404).json({ message: 'Relación medico-especialidad no encontrada' });
        }
        res.json({ message: 'Especialidad del médico eliminada' })
    });
});

export default router;