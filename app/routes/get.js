import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();

router.get('/get-comodos/:idPousada', (req, res) => {
  connection.query('SELECT * FROM comodos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

router.get('/get-users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

router.get('/get-objetos-comodo/:idComodo', (req, res) => {
  const { idComodo } = req.params;
  const query = 'SELECT * FROM objetos WHERE comodoID = ?';
  connection.query(query, [idComodo], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(results);
  });
});

export default router;
