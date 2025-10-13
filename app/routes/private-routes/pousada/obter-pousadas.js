import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.get('/get-pousada/:id', (req, res) => {
  const { id } = req.params;
    connection.query('SELECT * FROM pousada WHERE userID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });});

router.get('/get-pousada-details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [dataPousada] = await connection.promise().query('SELECT * FROM pousada WHERE pousadaID = ?', [id]);
    const [enderecoPousada] = await connection.promise().query('SELECT * FROM endereco WHERE enderecoID = ?', [id]);
    const [contatoPousada] = await connection.promise().query('SELECT * FROM contato WHERE pousadaID = ?', [id]);
    const [comodosPousada] = await connection.promise().query('SELECT * FROM comodos WHERE pousadaID = ?', [id]);
    return res.json({
      dataPousada: dataPousada[0] || null,
      enderecoPousada: enderecoPousada[0] || null,
      contatoPousada: contatoPousada[0] || null,
      comodosPousada: comodosPousada || [],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
export default router;