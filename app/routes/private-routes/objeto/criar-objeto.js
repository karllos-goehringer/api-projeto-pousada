import { Router } from "express";
import connection from "../../../../config/dbConnection.js";
import upload from "../../../../config/multer.js";
const router = Router();
router.post("/objeto/create-objeto",upload.single("objImagem"),(req, res) => {
    const { PFK_comodoID, objNome, objMarca, objUnidades, objLink } = req.body;
    const objImagem = req.file ? req.file.filename : null;
    if (!PFK_comodoID || !objNome) {
      return res.status(400).json({ error: "Dados obrigatórios ausentes." });
    }
    const sql = `
      INSERT INTO objetos (PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    connection.query(
      sql,
      [PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({
          message: "Objeto criado com sucesso!",
          id: result.insertId,
          imagem: objImagem
        });
      }
    );
  }
);
export default router;