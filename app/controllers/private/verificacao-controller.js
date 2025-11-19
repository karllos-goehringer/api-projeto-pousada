import verificacaoModels from "../../models/private/verificacao-models.js";

class VerificacaoController {

  async criarVerificacao(req, res) {
    try {
      const { PFK_comodoID } = req.params;
      const { objetosComodo, objetosPresentes, objetosFaltantes } = req.body;

      if (!PFK_comodoID)
        return res.status(400).json({ erro: "PFK_comodoID é obrigatório" });

      if (!Array.isArray(objetosComodo) || objetosComodo.length === 0)
        return res.status(400).json({ erro: "Nenhum objeto enviado." });

      if (!objetosComodo[0].PK_objID)
        return res.status(400).json({ erro: "Nenhum objeto cadastrado neste cômodo." });

      const dataVerificacao = new Date();

      const result = await verificacaoModels.createVerificacao(
        PFK_comodoID,
        objetosComodo,
        objetosPresentes,
        objetosFaltantes,
        dataVerificacao
      );

      return res.json({
        mensagem: "Verificação salva com sucesso!",
        insertId: result.insertId
      });

    } catch (erro) {
      console.error("Erro interno:", erro);
      return res.status(500).json({ erro: "Erro 500: não foi possível salvar a verificação." });
    }
  }

  async listarVerificacoes(req, res) {
    try {
      const { PFK_comodoID } = req.params;
      const rows = await verificacaoModels.getVerificacoes(PFK_comodoID);

      const verificacoes = rows.map(v => ({
        id: v.PK_verificacaoID,
        dataVerificacao: v.dataVerificacao,
        objetosPresentes: JSON.parse(v.jsonObjPresentes || "[]"),
        objetosFaltantes: JSON.parse(v.jsonObjFaltantes || "[]"),
        objetosComodo: JSON.parse(v.jsonObjComodo || "[]"),
      }));

      return res.status(200).json(verificacoes);

    } catch (erro) {
      console.error("Erro interno:", erro);
      return res.status(500).json({ erro: "Erro 500: não foi possível buscar as verificações." });
    }
  }
}

export default new VerificacaoController();
