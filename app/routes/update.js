import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();

router.put('/update-comodo/:id', (req, res) => {
  const { id } = req.params;
  const { comodoNome } = req.body;
  connection.query(
    'UPDATE comodos SET comodoNome = ? WHERE id = ?',
    [comodoNome, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cômodo não encontrado' });
      }
      return res.json({ message: 'Cômodo atualizado com sucesso!' });
    }
  );
});

export default router;
