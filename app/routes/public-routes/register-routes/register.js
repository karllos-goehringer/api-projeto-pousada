import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();
const router = Router();
router.post('/register', async (req, res) => {
  try {
    const { nome, senhaForm, email, codRecuperacaoUnico } = req.body;
    if (!nome || !senhaForm || !email ) {
      return res.status(400).json({ error: 'Nome, senha e email são obrigatórios.' });
    }

    const senha = await bcrypt.hash(senhaForm, 10);

    const buscarEmailSql = 'SELECT * FROM user WHERE email = ?';
    connection.query(buscarEmailSql, [email], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email já está em uso.' });
      } else {
        const sql = `
          INSERT INTO user (nome, senha, email, codRecuperacaoUnico)
          VALUES (?,?,?,?)
        `;
        connection.query(sql, [nome, senha, email, codRecuperacaoUnico], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          return res.json({ 
            message: 'Usuário criado com sucesso!', 
            id: result.insertId 
          });
        });
      }
    });
    } catch (error) {
    console.error("Erro catch geral:", error); // log detalhado
    return res.status(500).json({ error: error.message });
  }
});
export default router