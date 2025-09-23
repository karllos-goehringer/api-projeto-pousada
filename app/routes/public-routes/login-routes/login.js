import { Router } from "express";
import connection from '../../../../config/dbConnection.js';

const router = Router();

router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }
  const sql = `
    SELECT idUser, nome, email, adm
    FROM user 
    WHERE email = ? AND senha = ?
  `;
  connection.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao verificar login:", err);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Login negado." });
    }
    const usuario = results[0];
    const token = jwt.sign({
        id: usuario.idUser,
        email: usuario.email,
        adm: usuario.adm,
      }, process.env.JWT_SECRET, { expiresIn: "1h" } 
    );
    return res.json({
      message: "Login confirmado",
      usuario: {
        id: usuario.idUser,
        nome: usuario.nome,
        email: usuario.email,
        adm: usuario.adm,
      },
      token,
    });
  });
});

export default router;