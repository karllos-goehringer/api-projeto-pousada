import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();

router.delete('/delete-comodo/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM comodos WHERE id = ?',
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

router.delete('/delete-objeto/:id', (req, res) => {
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

router.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM user WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json({ message: 'Usuário deletado com sucesso!' });
    }
  );
});



export default router;
