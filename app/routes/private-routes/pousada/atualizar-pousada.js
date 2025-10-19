import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.put('/pousada-update-endereco/:id', (req, res) => {
  const PFK_pousadaID = req.params.id;
  const { rua, bairro, cidade, uf, numResidencia } = req.body;

  if (!rua || !bairro || !cidade || !uf || !numResidencia) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = `
    UPDATE endereco
    SET rua = ?, bairro = ?, cidade = ?, uf = ?, numResidencia = ?
    WHERE PFK_pousadaID = ?
  `;

  connection.query(sql, [rua, bairro, cidade, uf, numResidencia, PFK_pousadaID], (err, result) => {
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
router.put('/pousada-update-contato/:id', (req, res) => {
  const PFK_pousadaID = req.params.id;
  const { email, telefone, telefoneAlternativo, PK_telefoneID, telefoneAltID } = req.body;
  if (!email || !telefone) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }
  const sqlTelefone = `
    UPDATE telefone
    SET numBandeira = ?, numDistrital = ?, numero = ?
    WHERE PK_telefoneID  = ? AND PFK_pousadaID = ?
  `;

  const sql = `
    UPDATE contato
    SET email = ?
    WHERE PFK_pousadaID = ?
  `;
  connection.query(sql, [email, PFK_pousadaID], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar endereço:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Endereço não encontrado para essa pousada" });
    }
  });
  connection.query(sqlTelefone, [telefone.numBandeira, telefone.numDistrital, telefone.numero, PK_telefoneID, PFK_pousadaID], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar endereço:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Endereço não encontrado para essa pousada" });
    }
    connection.query(sqlTelefone, [telefoneAlternativo.numBandeira, telefoneAlternativo.numDistrital, telefoneAlternativo.numero, telefoneAltID, PFK_pousadaID], (err, result) => {
      if (err) {
        console.error("Erro ao atualizar endereço:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Endereço não encontrado para essa pousada" });
      }
      res.json({ message: "Endereço atualizado com sucesso!" });
    })
  })
});

export default router;
