// modules/auth/auth.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthModel from '../../models/public/login-model.js'
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
      }

      const usuarios = await AuthModel.buscarUsuarioPorEmail(email);

      if (usuarios.length === 0) {
        return res.status(401).json({ error: "Usuário não encontrado." });
      }

      const usuario = usuarios[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      const token = jwt.sign(
        {
          id: usuario.PK_userID,
          email: usuario.email,
        },
        jwtSecret,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login confirmado",
        usuario: {
          id: usuario.PK_userID,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      });

    } catch (erro) {
      console.error("Erro no login:", erro);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export default new AuthController();
