import ObjetoModel from "../../models/private/objeto-models.js";
import fs from "fs";
import path from "path";

class ObjetoController {
  getObjetos(req, res) {
    const { idComodo } = req.params;

    ObjetoModel.getObjetosByComodo(idComodo, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      const mapped = results.map(obj => ({
        ...obj,
        objImagem: obj.objImagem ? `${obj.objImagem}` : null
      }));

      return res.json(mapped);
    });
  }

  createObjeto(req, res) {
    const { PFK_comodoID, objNome, objMarca, objUnidades, objLink } = req.body;
    const objImagem = req.file ? req.file.filename : null;

    if (!PFK_comodoID || !objNome)
      return res.status(400).json({ error: "Dados obrigatórios ausentes." });

    ObjetoModel.createObjeto(
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

  updateObjeto(req, res) {
    const { id } = req.params;
    const { objNome, objMarca, objUnidades, objLink } = req.body;
    const objImagem = req.file ? req.file.filename : null;

    const dados = { objNome, objMarca, objUnidades, objLink, objImagem };

    ObjetoModel.updateObjeto(id, dados, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Objeto não encontrado" });

      return res.json({ message: "Objeto atualizado com sucesso!" });
    });
  }

  deleteObjeto(req, res) {
    const { PK_objID } = req.params;

    ObjetoModel.getImagemById(PK_objID, (err, results) => {
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

      ObjetoModel.deleteObjeto(PK_objID, (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        return res.json({ message: "Objeto deletado com sucesso!" });
      });
    });
  }
}
export default new ObjetoController();