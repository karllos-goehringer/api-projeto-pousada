import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.put('/pousada-update-endereco/:id', (req, res) => {
  const pousadaID = req.params.id;
  const { rua, bairro, cidade, uf } = req.body;

  if (!rua || !bairro || !cidade || !uf) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = `
    UPDATE endereco
    SET rua = ?, bairro = ?, cidade = ?, uf = ?
    WHERE enderecoID = ?
  `;

  connection.query(sql, [rua, bairro, cidade, uf, pousadaID], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar endereço:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Endereço não encontrado para essa pousada" });
    }

    res.json({ message: "Endereço atualizado com sucesso!" });
  });
});
export default router;
