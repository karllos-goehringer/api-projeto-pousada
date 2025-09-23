import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();
router.delete('/comodos/delete-comodo/:comodoID', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM comodos WHERE comodoID = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cômodo não encontrado' });
      }
      return res.json({ message: 'Cômodo deletado com sucesso!' });
    }
  );
});
export default router;
