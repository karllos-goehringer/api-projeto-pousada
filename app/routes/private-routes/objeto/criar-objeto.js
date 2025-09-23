import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();

router.post('/create-objeto', (req, res) => {
  const { comodoId, objNome, objMarca, objUnidades, objLink, objImagem } = req.body;
  const sql = `
    INSERT INTO objetos (comodoId, objNome, objMarca, objUnidades, objLink, objImagem)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(sql, [comodoId, objNome, objMarca, objUnidades, objLink, objImagem], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ 
      message: 'Objeto criado com sucesso!', 
      id: result.insertId 
    });
  });
});
export default router;
