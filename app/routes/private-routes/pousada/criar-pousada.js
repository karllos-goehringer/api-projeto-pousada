import { Router } from "express";
import connection from "../../../../config/dbConnection.js";

const router = Router();

router.post("/register", async (req, res) => {
  const {
    nomePousada,
    email,
    telefone,
    telefoneAlternativo,
    rua,
    bairro,
    cidade,
    uf,
    id, 
    numResidencia,
  } = req.body;
  if (
    !nomePousada?.trim() ||
    !email?.trim() ||
    !telefone ||
    !rua?.trim() ||
    !bairro?.trim() ||
    !cidade?.trim() ||
    !uf?.trim() ||
    !id ||
    !numResidencia?.trim()
  ) {
    console.log("Dados incompletos:", req.body);
    return res.status(400).json({ error: "Dados incompletos para cadastro!" });
  }
  const connectionPromise = connection.promise();
  try {
    const [resultPousada] = await connectionPromise.query(
      `INSERT INTO pousada (nomePousada, PFK_userID) VALUES (?, ?)`,
      [nomePousada, id]
    );

    const pousadaID = resultPousada.insertId;

    await connectionPromise.query(
      `INSERT INTO endereco (PFK_pousadaID, rua, bairro, cidade, UF, numResidencia)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [pousadaID, rua, bairro, cidade, uf, numResidencia]
    );
    await connectionPromise.query(
      `INSERT INTO contato (PFK_pousadaID, email) VALUES (?, ?)`,
      [pousadaID, email]
    );
    if (telefone) {
      await connectionPromise.query(
        `INSERT INTO telefone (PFK_pousadaID, numBandeira, numDistrital, numero)
         VALUES (?, ?, ?, ?)`,
        [
          pousadaID,
          telefone.numBandeira || null,
          telefone.numDistrital || null,
          telefone.numero,
        ]
      );
    }
    if (telefoneAlternativo) {
      await connectionPromise.query(
        `INSERT INTO telefone (PFK_pousadaID, numBandeira, numDistrital, numero)
         VALUES (?, ?, ?, ?)`,
        [
          pousadaID,
          telefoneAlternativo.numBandeira || null,
          telefoneAlternativo.numDistrital || null,
          telefoneAlternativo.numero,
        ]
      );
    }

    return res.json({
      message: "Pousada, endereço, contato e telefones cadastrados com sucesso!",
      pousadaID,
    });
  } catch (error) {
    console.error("Erro ao registrar pousada:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

export default router;