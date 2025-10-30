import express from 'express';
import connection from '../../../../config/dbConnection.js';


const router = express.Router();

// Atualizar todos os campos de um cômodo
router.put('/comodos/update-comodo/:comodoID', (req, res) => {
  const { comodoID } = req.params;
  const { PFK_pousadaID, comodoNome, comodoTipo, descComodo, capacidadePessoas, comodoStatus,} = req.body;

  if ( !PFK_pousadaID || !comodoNome || !comodoTipo || !capacidadePessoas || !comodoStatus ) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  const sql = `
    UPDATE comodos
    SET 
      PFK_pousadaID = ?,
      comodoNome = ?,
      comodoTipo = ?,
      descComodo = ?,
      capacidadePessoas = ?,
      comodoStatus = ?
    WHERE PK_comodoID = ?;
  `;

  const valores = [ PFK_pousadaID, comodoNome, comodoTipo, descComodo, capacidadePessoas, comodoStatus, comodoID,];

  connection.query(sql, valores, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cômodo:', err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cômodo não encontrado.' });
    }

    return res.json({ message: '✅ Cômodo atualizado com sucesso!' });
  });
});

export default router;
