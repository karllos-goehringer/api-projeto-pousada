import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.post('/create-user', (req, res) => {
  const { nome, senha, email } = req.body;
  const sql = `
    INSERT INTO user (nome, senha, email)
    VALUES (?, ?, ?)
  `;
  connection.query(sql, [nome, senha, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ 
      message: 'Usuário criado com sucesso!', 
      id: result.insertId 
    });
  });
});

export default router;