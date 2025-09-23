import { Router } from 'express';
import connection from '../../config/dbConnection.js';

router.get('/user/get-user-data/:idUser', (req, res) => {
  connection.query('SELECT * FROM user WHERE id', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

const router = Router();
export default router;
