import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
const router = Router();
router.post('/register', async (req, res) => {
  try{
  const { nome, senhaForm, email } = req.body;
  if (!nome || !senhaForm || !email) {
    return res.status(400).json({ error: 'Nome, senha e email são obrigatórios.' });
  }
  const senha = await bcrypt.hash(senhaForm, 10);
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
}catch (error) {
  console.error('Erro ao registrar usuário:', error);
  return res.status(500).json({ error: 'Erro interno no servidor.' });
}
})
export default router