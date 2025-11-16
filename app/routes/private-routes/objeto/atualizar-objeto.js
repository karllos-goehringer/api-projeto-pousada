import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';

const router = Router();
import multer from "multer";
const upload = multer();

router.put( "/objeto/update-objeto/:id", upload.single("objImagem"), (req, res) => {
        const { id } = req.params;
        const { PFK_comodoID, objNome, objMarca, objUnidades, objLink } = req.body;
        let objImagem = null;
        if (req.file) {
            objImagem = req.file.buffer; // arquivo enviado
        }
        const sql = `
      UPDATE objetos
      SET PFK_comodoID = ?, objNome = ?, objMarca = ?, objUnidades = ?, objLink = ?, objImagem = ?
      WHERE PK_objID = ?
    `;

        connection.query(
            sql,
            [PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem, id],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Objeto não encontrado" });
                }

                return res.json({ message: "Objeto atualizado com sucesso!" });
            }
        );
    }
);

export default router;
