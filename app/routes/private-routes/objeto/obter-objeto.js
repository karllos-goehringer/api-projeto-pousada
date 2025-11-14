import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.get('/objeto/get-objetos-comodo/:idComodo', (req, res) => {
  const idComodo = req.params.idComodo;

  const query = 'SELECT * FROM objetos WHERE PFK_comodoID = ?';

  connection.query(query, [idComodo], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(results);
  });
});

export default router;