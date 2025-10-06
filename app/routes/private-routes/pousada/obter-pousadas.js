import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.get('/get-pousadas/:id', (req, res) => {
  const { id } = req.params;
    connection.query('SELECT * FROM pousada WHERE userID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });});
export default router;
