import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { nomePousada, email, telefone, telefoneAlternativo, rua, bairro, cidade, uf, id } = req.body;

if (
  !nomePousada?.trim() ||
  !email?.trim() ||
  !telefone?.trim() ||
  !rua?.trim() ||
  !bairro?.trim() ||
  !cidade?.trim() ||
  !uf?.trim() ||
  !id?.trim()
) {
  console.log('Dados incompletos:', req.body);
  return res.status(400).json({ error: 'Dados incompletos para cadastro!' });
}
    const userID = id;
    const sqlPousada = `INSERT INTO pousada (nomePousada, userID) VALUES (?, ?)`;
    connection.query(sqlPousada, [nomePousada, userID], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const pousadaID = result.insertId;

      const sqlEndereco = `INSERT INTO endereco (enderecoID,rua, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?)`;
      connection.query(sqlEndereco, [pousadaID,rua, bairro, cidade, uf], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const sqlContato = `INSERT INTO contato (pousadaID, email, telefone, telefoneAlternativo) VALUES (?, ?, ?, ?)`;
        connection.query(sqlContato, [pousadaID, email, telefone, telefoneAlternativo || null], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          return res.json({
            message: 'Pousada, endereço e contato cadastrados com sucesso!',
            pousadaID,
          });
        });
      });
    });
  } catch (error) {
    console.error('Erro ao registrar pousada:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

export default router;