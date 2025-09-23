import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();

router.get('/comodos/get-comodos/:idPousada', (req, res) => {
  connection.query('SELECT * FROM comodos WHERE idPousada = ?', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

export default router;
