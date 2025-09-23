import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.post('/comodos/create-comodo', (req, res) => {
  const { comodoNome, comodoTipo, descComodo, capacidade, comodoStatus } = req.body;

  const sql = `
    INSERT INTO comodos (comodoNome, comodoTipo, descComodo, capacidade, comodoStatus)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(sql, [comodoNome, comodoTipo, descComodo, capacidade, comodoStatus], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ 
      message: 'Cômodo criado com sucesso!', 
      id: result.insertId 
    });
  });
});
export default router;
