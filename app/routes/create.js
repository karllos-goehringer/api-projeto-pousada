import { Router } from 'express';
import connection from '../../config/dbConnection.js';

const router = Router();

router.post('/create-comodo', (req, res) => {
  const { comodoNome, comodoTipo, descComodo, capacidade, comodoStatus } = req.body;

  const sql = `
    INSERT INTO comodos (comodoNome, comodoTipo, descComodo, capacidade, comodoStatus)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(sql, [comodoNome, comodoTipo, descComodo, capacidade, comodoStatus], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ 
      message: 'Cômodo criado com sucesso!', 
      id: result.insertId 
    });
  });
});

router.post('/create-user', (req, res) => {
  const { nome, senha, email } = req.body;
  const sql = `
    INSERT INTO user (nome, senha, email)
    VALUES (?, ?, ?)
  `;
  connection.query(sql, [nome, senha, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ 
      message: 'Usuário criado com sucesso!', 
      id: result.insertId 
    });
  });
});
//comodoId 	objId 	objNome 	objMarca 	objUnidades 	objLink 	objImagem 	
router.post('/create-objeto', (req, res) => {
  const { comodoId, objNome, objMarca, objUnidades, objLink, objImagem } = req.body;
  const sql = `
    INSERT INTO objetos (comodoId, objNome, objMarca, objUnidades, objLink, objImagem)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(sql, [comodoId, objNome, objMarca, objUnidades, objLink, objImagem], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ 
      message: 'Objeto criado com sucesso!', 
      id: result.insertId 
    });
  });
});

export default router;
