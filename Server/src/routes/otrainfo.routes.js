import { Router } from 'express';
import connection from '../config/db.js';

const router = Router();

router.get('/', (req,res) => {
    const sql = `
    SELECT DISTINCT motivo FROM Motivos;
    SELECT DISTINCT metodo FROM Pagos;
    SELECT DISTINCT ubicacion FROM Ubicaciones;
    `
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message});
        res.json({
            motivos:results[0],
            pagos: results[1],
            ubis: results[2]
        })
    })
})

export default router;