import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.delete('/objeto/delete-objeto/:PK_objID', (req, res) => {
  const { PK_objID } = req.params;
  connection.query(
    'DELETE FROM objetos WHERE PK_objID = ?',
    [PK_objID],
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
