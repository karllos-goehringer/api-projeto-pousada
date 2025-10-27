import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.get('/objeto/get-objetos-comodo/:idComodo', (req, res) => {
  const { PK_comodoID } = req.params.idComodo;
  const query = 'SELECT * FROM objetos WHERE PK_comodoID = ?';
  connection.query(query, [PK_comodoID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(results);
  });
});
export default router;
