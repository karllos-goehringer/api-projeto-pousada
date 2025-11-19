import objetoModels from "../../models/private/objeto-models.js";
import fs from "fs";
import path from "path";

export function getObjetos(req, res) {
  const { idComodo } = req.params;

  objetoModels.getObjetosByComodo(idComodo, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const mapped = results.map(obj => ({
      ...obj,
      objImagem: obj.objImagem ? `${obj.objImagem}` : null
    }));

    return res.json(mapped);
  });
}

export function createObjeto(req, res) {
  const { PFK_comodoID, objNome, objMarca, objUnidades, objLink } = req.body;
  const objImagem = req.file ? req.file.filename : null;

  if (!PFK_comodoID || !objNome)
    return res.status(400).json({ error: "Dados obrigatórios ausentes." });

  objetoModels.createObjeto(
    { PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem },
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.json({
        message: "Objeto criado com sucesso!",
        id: result.insertId,
        imagem: objImagem,
      });
    }
  );
}

export function updateObjeto(req, res) {
  const { id } = req.params;
  const { objNome, objMarca, objUnidades, objLink } = req.body;
  const objImagem = req.file ? req.file.filename : null;

  const dados = { objNome, objMarca, objUnidades, objLink, objImagem };

  objetoModels.updateObjeto(id, dados, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Objeto não encontrado" });

    return res.json({ message: "Objeto atualizado com sucesso!" });
  });
}

export function deleteObjeto(req, res) {
  const { PK_objID } = req.params;

  objetoModels.getImagemById(PK_objID, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ message: "Objeto não encontrado" });

    const imagem = results[0].objImagem;

    if (imagem) {
      const caminho = path.join("uploads/objetos", imagem);
      fs.unlink(caminho, (err) => {
        if (err) console.warn("Não foi possível deletar a imagem:", imagem);
      });
    }

    objetoModels.deleteObjeto(PK_objID, (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      return res.json({ message: "Objeto deletado com sucesso!" });
    });
  });
}
