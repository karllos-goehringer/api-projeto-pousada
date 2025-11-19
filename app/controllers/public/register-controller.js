// modules/auth/register/authRegister.controller.js
import bcrypt from "bcrypt";
import AuthRegisterModel from '../../models/public/register-model.js'
class AuthRegisterController {
  async register(req, res) {
    try {
      const { nome, senhaForm, email, codRecuperacaoUnico } = req.body;

      if (!nome || !senhaForm || !email) {
        return res.status(400).json({ error: "Nome, senha e email são obrigatórios." });
      }

      const emailExiste = await AuthRegisterModel.buscarEmail(email);

      if (emailExiste.length > 0) {
        return res.status(400).json({ error: "Email já está em uso." });
      }

      const senhaHash = await bcrypt.hash(senhaForm, 10);

      const novoUsuario = await AuthRegisterModel.criarUsuario(
        nome,
        senhaHash,
        email,
        codRecuperacaoUnico
      );

      return res.json({
        message: "Usuário criado com sucesso!",
        id: novoUsuario.insertId,
      });
    } catch (erro) {
      console.error("Erro ao registrar usuário:", erro);
      return res.status(500).json({ error: "Erro interno ao registrar usuário." });
    }
  }
}

export default new AuthRegisterController();
