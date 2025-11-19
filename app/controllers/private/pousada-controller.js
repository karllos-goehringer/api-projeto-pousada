import pousadaModels from "../../models/private/pousada-models.js";

export default {
  updateEndereco(req, res) {
    const id = req.params.id;
    const { rua, bairro, cidade, uf, numResidencia } = req.body;

    pousadaModels.updateEndereco(id, [rua, bairro, cidade, uf, numResidencia], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Endereço não encontrado" });

      res.json({ message: "Endereço atualizado com sucesso!" });
    });
  },

  updateNome(req, res) {
    const id = req.params.id;
    const { pousadaNome } = req.body;

    pousadaModels.updateNome(id, pousadaNome, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Nome atualizado", affectedRows: result.affectedRows });
    });
  },

  async getDetails(req, res) {
    const id = req.params.id;

    try {
      const { pousada, endereco, contato, comodos } =
        pousadaModels.getPousadaDetails(id);

      const [dadosPousada] = await pousada;
      const [dadosEndereco] = await endereco;
      const [dadosContato] = await contato;
      const [dadosComodos] = await comodos;

      res.json({
        pousada: dadosPousada[0] || null,
        endereco: dadosEndereco[0] || null,
        contato: dadosContato[0] || null,
        comodos: dadosComodos || [],
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  getByUser(req, res) {
    const id = req.params.id;

    pousadaModels.getPousadaByUser(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  delete(req, res) {
    const id = req.params.pousadaID;

    pousadaModels.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Pousada não encontrada" });

      res.json({ message: "Pousada deletada com sucesso" });
    });
  },
 getTelefonesPousada: async (req, res) => {
    const { idTelefone, idTelefoneAlternativo } = req.params;

    if (!idTelefone || !idTelefoneAlternativo) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    try {
      const telefones = await pousadaModels.getTelefones(idTelefone, idTelefoneAlternativo);

      if (!telefones.telefone && !telefones.telefoneAlternativo) {
        return res.status(404).json({ message: "Telefones não encontrados" });
      }

      res.json(telefones);
    } catch (error) {
      console.error("Erro ao buscar telefones:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

   cadastrarPousada: async (req, res) =>  {
    try {
      const {
        nomePousada,
        idUser,
        rua,
        bairro,
        cidade,
        uf,
        numResidencia,
        telefone,
        telefoneAlternativo,
        email
      } = req.body;
   
      const dadosPousada = {
        nomePousada,
        idUser,
        rua,
        bairro,
        cidade,
        uf,
        numResidencia,
        telefone,
        telefoneAlternativo: telefoneAlternativo || { bandeira: '', prefixoRegional: '', numero: '' },
        email
      };

      const resultado = await pousadaModels.cadastrarPousada(dadosPousada);

      res.status(201).json({
        message: 'Pousada cadastrada com sucesso',
        pousadaID: resultado.pousadaID,
        telefones: {
          principal: resultado.idTelPrincipal,
          alternativo: resultado.idTelAlternativo
        }
      });

    } catch (error) {
      console.error('Erro ao cadastrar pousada:', error);
      res.status(500).json({
        error: 'Erro interno do servidor ao cadastrar pousada',
        details: error.message
      });
    }
  }
}