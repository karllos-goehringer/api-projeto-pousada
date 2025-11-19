import bcrypt from "bcrypt";
import UserModel from "../../models/private/usuario-models.js";
class UserController {
  async updateUser(req, res) {
    const { idUser } = req.params;
    const { email, senha, nome } = req.body;
    if (!idUser || isNaN(idUser)) {
      return res.status(400).json({ error: "ID do usuário inválido" });
    }
    if (!email || !senha || !nome) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const hashed = await bcrypt.hash(senha, 10);

    try {
      const result = await UserModel.updateUser(idUser, email, hashed, nome);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Email já está em uso" });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE /user/delete-user/:idUser
  async deleteUser(req, res) {
    const { idUser } = req.params;

    try {
      const result = await UserModel.deleteUser(idUser);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.json({ message: "Usuário deletado com sucesso." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET /user/get-user-data/:idUser
  async getUserData(req, res) {
    const { idUser } = req.params;

    try {
      const result = await UserModel.getUserData(idUser);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new UserController();
