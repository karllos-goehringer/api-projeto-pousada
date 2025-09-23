import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.delete('/pousada/delete-pousada/:pousadaID', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM pousada WHERE pousadaID = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Pousada não encontrada.' });
      }
      return res.json({ message: 'Pousada deletada com sucesso.' });
    }
  );
});
export default router;
