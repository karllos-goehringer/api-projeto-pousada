import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
router.get('/objeto/get-objetos-comodo/:idComodo', (req, res) => {
  const { idComodo } = req.params;

  const sql = `
    SELECT PK_objID, objNome, objMarca, objUnidades, objLink,
           objImagem
    FROM objetos
    WHERE PFK_comodoID = ?
  `;

  connection.query(sql, [idComodo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const mapped = results.map(obj => ({
      ...obj,
      objImagem: obj.objImagem
        ? `${obj.objImagem}`
        
        : null
    }));

    return res.json(mapped);
  });
})

export default router;