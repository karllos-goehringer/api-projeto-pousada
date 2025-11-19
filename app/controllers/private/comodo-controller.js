import comodoModels from "../../models/private/comodo-models.js";
export default {
  getComodos(req, res) {
    const { idPousada } = req.params;

    comodoModels.getComodosByPousada(idPousada, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.json(results);
    });
  },

  getComodoById(req, res) {
    const { idComodo } = req.params;

    comodoModels.getComodoById(idComodo, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json(results);
    });
  },

  createComodo(req, res) {
    const dados = req.body;

    comodoModels.createComodo(dados, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.json({
        message: "Cômodo criado com sucesso!",
        id: result.insertId,
      });
    });
  },

  updateComodo(req, res) {
    const { comodoID } = req.params;
    const dados = req.body;

    if (
      !dados.PFK_pousadaID ||
      !dados.comodoNome ||
      !dados.comodoTipo ||
      !dados.capacidadePessoas ||
      !dados.comodoStatus
    ) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    comodoModels.updateComodo(comodoID, dados, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Cômodo não encontrado." });

      return res.json({ message: "Cômodo atualizado com sucesso!" });
    });
  },

  deleteComodo(req, res) {
    const { PK_comodoID } = req.params;

    comodoModels.deleteComodo(PK_comodoID, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Cômodo não encontrado" });

      return res.json({ message: "Cômodo deletado com sucesso!" });
    });
  },
};
