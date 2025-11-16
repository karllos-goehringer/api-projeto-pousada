import { Router } from "express";
import connection from "../../../../config/dbConnection.js";
import fs from "fs";
import path from "path";

const router = Router();

router.delete("/objeto/delete-objeto/:PK_objID", (req, res) => {
  const { PK_objID } = req.params;
  connection.query(
    "SELECT objImagem FROM objetos WHERE PK_objID = ?",
    [PK_objID],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(404).json({ message: "Objeto não encontrado" });
      }
      const imagem = results[0].objImagem;
      if (imagem) {
        const imagePath = path.join("uploads/objetos", imagem);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.warn("⚠ Não foi possível deletar a imagem:", imagem);
          }
        });
      }
      connection.query(
        "DELETE FROM objetos WHERE PK_objID = ?",
        [PK_objID],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          return res.json({ message: "Objeto deletado com sucesso!" });
        }
      );
    }
  );
});
export default router;