import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';
import bcrypt from 'bcrypt';
const router = Router();

router.put('/user/atualizar-user/:idUser', (req, res) => {
  const { idUser: PFK_userID } = req.params;
  const { email, senha, nome } = req.body;

  // Validações
  if (!PFK_userID || isNaN(PFK_userID)) {
    return res.status(400).json({ error: 'ID do usuário inválido' });
  }

  if (!email || !senha || !nome) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Erro ao processar senha' });

    connection.query(
      `UPDATE usuarios SET email = ?, senha = ?, nome = ? WHERE idUser = ?`,
      [email, hashedPassword, nome, PFK_userID],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email já está em uso' });
          }
          return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        return res.json({ message: 'Usuário atualizado com sucesso!' });
      }
    );
  });
});

export default router;
