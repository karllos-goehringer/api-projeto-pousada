import PousadaModel from "../../models/private/pousada-models.js";

class PousadaController {
  updateEndereco(req, res) {
    const id = req.params.id;
    const { rua, bairro, cidade, uf, numResidencia } = req.body;

    PousadaModel.updateEndereco(id, [rua, bairro, cidade, uf, numResidencia], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Endereço não encontrado" });

      res.json({ message: "Endereço atualizado com sucesso!" });
    });
  }

  updateNome(req, res) {
    const id = req.params.id;
    const { pousadaNome } = req.body;

    PousadaModel.updateNome(id, pousadaNome, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Nome atualizado", affectedRows: result.affectedRows });
    });
  }

  async getDetails(req, res) {
    const id = req.params.id;

    try {
      const { pousada, endereco, contato, comodos } =
        PousadaModel.getPousadaDetails(id);

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
  }

  getByUser(req, res) {
    const id = req.params.id;

    PousadaModel.getPousadaByUser(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  }

  delete(req, res) {
    const id = req.params.pousadaID;

    PousadaModel.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Pousada não encontrada" });

      res.json({ message: "Pousada deletada com sucesso" });
    });
  }

  async getTelefonesPousada (req, res){
    const { idTelefone, idTelefoneAlternativo } = req.params;

    if (!idTelefone || !idTelefoneAlternativo) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    try {
      const telefones = await PousadaModel.getTelefones(idTelefone, idTelefoneAlternativo);

      if (!telefones.telefone && !telefones.telefoneAlternativo) {
        return res.status(404).json({ message: "Telefones não encontrados" });
      }

      res.json(telefones);
    } catch (error) {
      console.error("Erro ao buscar telefones:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async updateContato(req, res) {
  const PFK_pousadaID = req.params.id;
  const { email, telefone, telefoneAlternativo, PK_telefoneID, telefoneAltID } = req.body;
  if (!email || !telefone) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }
  try {
    const contatobd = await PousadaModel.updateContato(
      PFK_pousadaID,
      email,
      telefone,
      telefoneAlternativo,
      PK_telefoneID,
      telefoneAltID
    );
    return res.json({ message: contatobd.message });
  } catch (e) {
    console.error("Erro ao atualizar contato:", e);
    return res.status(500).json({ error: "Erro ao atualizar contato." });
  }
}

   async cadastrarPousada (req, res) {
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

      const resultado = await PousadaModel.cadastrarPousada(dadosPousada);

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
export default new PousadaController();