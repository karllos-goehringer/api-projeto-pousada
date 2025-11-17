import { Router } from 'express';
import connection from '../../../../config/dbConnection.js';
const router = Router();
router.post("/verificacao/:PFK_comodoID", async (req, res) => {
    try {
        const { PFK_comodoID } = req.params;
        const { objetosComodo, objetosPresentes, objetosFaltantes } = req.body;
          if (!PFK_comodoID) {
            return res.status(400).json({ erro: "PFK_comodoID é obrigatório" });
        }

        if (!Array.isArray(objetosComodo) || objetosComodo.length === 0) {
            return res.status(400).json({ erro: "Nenhum objeto enviado." });
        }

        if (!objetosComodo[0].PK_objID) {
            return res.status(400).json({ erro: "Nenhum objeto cadastrado neste cômodo." });
        }
        const dataVerificacao = new Date()
        const sql = ` INSERT INTO verificacoes  (PFK_comodoID, jsonObjComodo, jsonObjPresentes, jsonObjFaltantes,dataVerificacao) VALUES (?, ?, ?, ?,?)`;
        const valores = [PFK_comodoID,JSON.stringify(objetosComodo || []),JSON.stringify(objetosPresentes || []),JSON.stringify(objetosFaltantes || []), dataVerificacao];
        connection.query(sql, valores, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                mensagem: "Verificação salva com sucesso!",
                insertId: results.insertId
            });
        });
    } catch (erro) {
        console.error("Erro interno:", erro);
        res.status(500).json({ erro: "Erro 500, não foi possível salvar a verificação." });
    }
});
router.get('/get-verificacoes/:PFK_comodoID', async (req, res) => {
    try {
        const { PFK_comodoID } = req.params;

        const sql = `SELECT * FROM verificacoes WHERE PFK_comodoID = ? ORDER BY dataVerificacao DESC`;
        const valores = [PFK_comodoID];

        connection.query(sql, valores, (err, results) => {
            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar as verificações do cômodo',
                    detalhes: err
                });
            }

            // Se não houver verificações
            if (!results || results.length === 0) {
                return res.status(200).json([]);
            }

            // Fazer parse do JSON armazenado no banco
            const verificacoes = results.map(v => ({
                id: v.PK_verificacaoID,
                dataVerificacao: v.dataVerificacao,
                objetosPresentes: JSON.parse(v.jsonObjPresentes || "[]"),
                objetosFaltantes: JSON.parse(v.jsonObjFaltantes || "[]"),
                objetosComodo: JSON.parse(v.jsonObjComodo || "[]"),
            }));

            return res.status(200).json(verificacoes);
        });

    } catch (erro) {
        console.log('Erro interno:', erro);
        res.status(500).json({ erro: "Erro 500, não foi possível buscar as verificações." });
    }
});
export default router;
