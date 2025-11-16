import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';
import multer from "multer";
import fs from "fs";
import path from "path";
const router = Router();
// Pasta de upload
const uploadPath = path.join(process.cwd(), "uploads/objeto");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadPath),
  filename: (_, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  }
});
const upload = multer({ storage });
router.put("/objeto/update-objeto/:id", upload.single("objImagem"), (req, res) => {
  const { id } = req.params;
  const { objNome, objMarca, objUnidades, objLink } = req.body;

  let objImagem = null;
  if (req.file) {
    objImagem = req.file.filename; // só o nome do arquivo
  }

  const sql = `
    UPDATE objetos
    SET objNome = ?, objMarca = ?, objUnidades = ?, objLink = ?, ${objImagem ? "objImagem = ?" : ""}
    WHERE PK_objID = ?
  `;

  const params = objImagem
    ? [objNome, objMarca, objUnidades, objLink, objImagem, id]
    : [objNome, objMarca, objUnidades, objLink, id];

  connection.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Objeto não encontrado" });
    return res.json({ message: "Objeto atualizado com sucesso!" });
  });
});

export default router;
