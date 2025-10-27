import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();

router.get('/comodos/get-comodos/:idPousada', (req, res) => {
  const idPousada = req.params.idPousada;
  const sql = 'SELECT * FROM comodos WHERE PFK_pousadaID = ?';
  connection.query(sql, [idPousada], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});
router.get('/comodos/getComodoById/:idComodo', (req, res) => {
  const PK_comodoID = req.params.idComodo;
  const sql = 'SELECT * FROM comodos WHERE PK_comodoID = ?';
  connection.query(sql, [PK_comodoID], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

export default router;
