import { Router } from "express";
import connection from "../../../../config/dbConnection.js";

const router = Router();

router.post("/register", (req, res) => {
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

  // Validação mínima


  // Inicia transação
  connection.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Inserir pousada
    connection.query(
      "INSERT INTO pousada (nomePousada, PFK_userID) VALUES (?, ?)",
      [nomePousada, id],
      (err, resultPousada) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }

        const pousadaID = resultPousada.insertId;

        // Inserir endereço
        connection.query(
          "INSERT INTO endereco (PFK_pousadaID, rua, bairro, cidade, UF, numResidencia) VALUES (?, ?, ?, ?, ?, ?)",
          [pousadaID, rua, bairro, cidade, uf, numResidencia],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ error: err.message });
              });
            }

            // Inserir telefone principal
            connection.query(
              "INSERT INTO telefone (PFK_pousadaID, numBandeira, numDistrital, numero) VALUES (?, ?, ?, ?)",
              [pousadaID, telefone.bandeira, telefone.prefixoRegional, telefone.numero],
              (err, tel1Result) => {
                if (err) {
                  return connection.rollback(() => {
                    res.status(500).json({ error: err.message });
                  });
                }
                const idTelPrincipal = tel1Result.insertId;

                // Inserir telefone alternativo
                connection.query(
                  "INSERT INTO telefone (PFK_pousadaID, numBandeira, numDistrital, numero) VALUES (?, ?, ?, ?)",
                  [
                    pousadaID,
                    telefoneAlternativo.bandeira,
                    telefoneAlternativo.prefixoRegional,
                    telefoneAlternativo.numero,
                  ],
                  (err, tel2Result) => {
                    if (err) {
                      return connection.rollback(() => {
                        res.status(500).json({ error: err.message });
                      });
                    }
                    const idTelAlternativo = tel2Result.insertId;

                    // Inserir contato
                    connection.query(
                      "INSERT INTO contato (PFK_pousadaID, telefone, telefoneAlternativo, email) VALUES (?, ?, ?, ?)",
                      [pousadaID, idTelPrincipal, idTelAlternativo, email],
                      (err) => {
                        if (err) {
                          return connection.rollback(() => {
                            res.status(500).json({ error: err.message });
                          });
                        }

                        // Commit da transação
                        connection.commit((err) => {
                          if (err) {
                            return connection.rollback(() => {
                              res.status(500).json({ error: err.message });
                            });
                          }

                          res.json({
                            message:
                              "✅ Pousada, endereço, contato e telefones cadastrados com sucesso!",
                            pousadaID,
                          });
                        });
                      }
                    ); // Fim insert contato
                  }
                ); // Fim insert telefone alternativo
              }
            ); // Fim insert telefone principal
          }
        ); // Fim insert endereço
      }
    ); // Fim insert pousada
  }); // Fim beginTransaction
});

export default router;
