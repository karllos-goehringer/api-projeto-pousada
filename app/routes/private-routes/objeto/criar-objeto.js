import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();

router.post('/objeto/create-objeto', (req, res) => {
  const { PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem } = req.body;
  const sql = `
    INSERT INTO objetos (PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(sql, [PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ 
      message: 'Objeto criado com sucesso!', 
      id: result.insertId 
    });
  });
});
export default router;
