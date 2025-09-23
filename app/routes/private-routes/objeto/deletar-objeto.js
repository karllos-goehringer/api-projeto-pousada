import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();
router.delete('/objeto/delete-objeto/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM objetos WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Objeto não encontrado' });
      }
      return res.json({ message: 'Objeto deletado com sucesso!' });
    }
  );
});
export default router;
