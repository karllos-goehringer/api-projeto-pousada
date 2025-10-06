import { Router } from "express";
import connection from "../../../../config/dbConnection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
const router = Router();
const jwtSecret = process.env.JWT_SECRET;
router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }
  const sql = `
    SELECT idUser, nome, email, senha, adm
    FROM user
    WHERE email = ?
  `;
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Erro ao verificar login:", err);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta." });
    }
    const token = jwt.sign(
      {
        id: usuario.idUser,
        email: usuario.email,
        adm: usuario.adm,
      },
      jwtSecret,
      { expiresIn: "1h" }
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