import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.get('/get-pousada/:id', (req, res) => {
  const { id } = req.params;
    connection.query('SELECT * FROM pousada WHERE PFK_userID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });});

router.get('/get-pousada-details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [dataPousada] = await connection.promise().query('SELECT * FROM pousada WHERE PK_pousadaID = ?', [id]);
    const [enderecoPousada] = await connection.promise().query('SELECT * FROM endereco WHERE PFK_pousadaID = ?', [id]);
    const [contatoPousada] = await connection.promise().query('SELECT * FROM contato WHERE PFK_pousadaID = ?', [id]);
    const [comodosPousada] = await connection.promise().query('SELECT * FROM comodos WHERE PFK_pousadaID = ?', [id]);
    return res.json({
      dataPousada: dataPousada[0] || null,
      enderecoPousada: enderecoPousada[0] || null,
      contatoPousada: contatoPousada[0] || null,
      comodosPousada: comodosPousada || [],
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
router.get('/get-telefones-pousada/:idTelefone/:idTelefoneAlternativo', async (req, res) => {
  const { idTelefone, idTelefoneAlternativo } = req.params;

  try {
const sql = `
  SELECT PK_telefoneID AS id, numBandeira, numDistrital, numero
  FROM telefone
  WHERE PK_telefoneID IN (?, ?)
`;

    connection.query(sql, [idTelefone, idTelefoneAlternativo], (err, results) => {
      if (err) {
        console.error("Erro ao buscar telefones:", err);
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Telefones não encontrados" });
      }

      const telPrincipal = results.find(r => r.id == idTelefone) || null;
      const telAlternativo = results.find(r => r.id == idTelefoneAlternativo) || null;
      
      res.json({
        telefone: telPrincipal,
        telefoneAlternativo: telAlternativo,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});
export default router;