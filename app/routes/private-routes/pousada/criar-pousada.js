import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { nomePousada, email, telefone, telefoneAlternativo, rua, bairro, cidade, uf, id } = req.body;

//    if (!nomePousada || !email || !telefone || !rua || !bairro || !cidade || !uf || !id) {
  //    console.log('Dados incompletos:', req.body);
    //  return res.status(400).json({ error: 'Dados incompletos para cadastro!' });
    //}
    const userID = id;
    // 1️⃣ Inserir pousada
    const sqlPousada = `INSERT INTO pousada (nomePousada, userID) VALUES (?, ?)`;
    connection.query(sqlPousada, [nomePousada, userID], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const pousadaID = result.insertId;

      // 2️⃣ Inserir endereço
      const sqlEndereco = `INSERT INTO endereco (enderecoID,rua, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?)`;
      connection.query(sqlEndereco, [pousadaID,rua, bairro, cidade, uf], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // 3️⃣ Inserir contato
        const sqlContato = `INSERT INTO contato (pousadaID, email, telefone, telefoneAlternativo) VALUES (?, ?, ?, ?)`;
        connection.query(sqlContato, [pousadaID, email, telefone, telefoneAlternativo || null], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // ✅ Tudo certo
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