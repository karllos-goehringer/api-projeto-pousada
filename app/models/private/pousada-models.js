import connection from "../../../config/dbConnection.js";

export default {
  updateEndereco(id, data, callback) {
    const sql = `
      UPDATE endereco
      SET rua=?, bairro=?, cidade=?, uf=?, numResidencia=?
      WHERE PFK_pousadaID=?
    `;
    connection.query(sql, [...data, id], callback);
  },

  updateNome(id, nome, callback) {
    const sql = `
      UPDATE pousada
      SET nomePousada = ?
      WHERE PK_pousadaID = ?
    `;
    connection.query(sql, [nome, id], callback);
  },

  getPousadaByUser(id, callback) {
    const sql = `SELECT * FROM pousada WHERE PFK_userID = ?`;
    connection.query(sql, [id], callback);
  },

  getPousadaDetails(id) {
    return {
      pousada: connection.promise().query(
        "SELECT * FROM pousada WHERE PK_pousadaID = ?",
        [id]
      ),
      endereco: connection.promise().query(
        "SELECT * FROM endereco WHERE PFK_pousadaID = ?",
        [id]
      ),
      contato: connection.promise().query(
        "SELECT * FROM contato WHERE PFK_pousadaID = ?",
        [id]
      ),
      comodos: connection.promise().query(
        "SELECT * FROM comodos WHERE PFK_pousadaID = ?",
        [id]
      ),
    };
  },

  delete(id, callback) {
    const sql = `DELETE FROM pousada WHERE PK_pousadaID = ?`;
    connection.query(sql, [id], callback);
  },
  
  getTelefones(idTelefone, idTelefoneAlternativo){
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT PK_telefoneID AS id, numBandeira, numDistrital, numero
        FROM telefone
        WHERE PK_telefoneID IN (?, ?)
      `;

      connection.query(sql, [idTelefone, idTelefoneAlternativo], (err, results) => {
        if (err) return reject(err);

        const telPrincipal = results.find(r => r.id == idTelefone) || null;
        const telAlternativo = results.find(r => r.id == idTelefoneAlternativo) || null;

        resolve({ telefone: telPrincipal, telefoneAlternativo: telAlternativo });
      });
    });
  },
    cadastrarPousada(dadosPousada) {
    return new Promise((resolve, reject) => {
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
      } = dadosPousada;

      connection.beginTransaction(err => {
        if (err) return reject(err);

        this.inserirPousada(nomePousada, idUser)
          .then(resultPousada => {
            const pousadaID = resultPousada.insertId;
            return Promise.all([
              this.inserirEndereco(pousadaID, { rua, bairro, cidade, uf, numResidencia }),
              this.inserirTelefone(pousadaID, telefone),
              this.inserirTelefone(pousadaID, telefoneAlternativo)
            ]).then(([_, telPrincipal, telAlternativo]) => ({
              pousadaID,
              idTelPrincipal: telPrincipal.insertId,
              idTelAlternativo: telAlternativo.insertId
            }));
          })
          .then(({ pousadaID, idTelPrincipal, idTelAlternativo }) => {
            return this.inserirContato(pousadaID, idTelPrincipal, idTelAlternativo, email)
              .then(() => ({ pousadaID, idTelPrincipal, idTelAlternativo }));
          })
          .then(result => {
            connection.commit(err => {
              if (err) return connection.rollback(() => reject(err));
              resolve(result);
            });
          })
          .catch(err => {
            connection.rollback(() => reject(err));
          });
      });
    });
  },

  inserirPousada(nomePousada, idUser) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO pousada (nomePousada, PFK_userID) VALUES (?, ?)";
      connection.query(sql, [nomePousada, idUser], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  inserirEndereco(pousadaID, endereco) {
    return new Promise((resolve, reject) => {
      const { rua, bairro, cidade, uf, numResidencia } = endereco;
      const sql = `
        INSERT INTO endereco 
        (PFK_pousadaID, rua, bairro, cidade, UF, numResidencia) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      connection.query(sql, [pousadaID, rua, bairro, cidade, uf, numResidencia], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  inserirTelefone(pousadaID, telefone) {
    return new Promise((resolve, reject) => {
      const { bandeira, prefixoRegional, numero } = telefone;
      const sql = `
        INSERT INTO telefone 
        (PFK_pousadaID, numBandeira, numDistrital, numero) 
        VALUES (?, ?, ?, ?)
      `;
      connection.query(sql, [pousadaID, bandeira, prefixoRegional, numero], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  inserirContato(pousadaID, idTelPrincipal, idTelAlternativo, email) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO contato 
        (PFK_pousadaID, telefone, telefoneAlternativo, email) 
        VALUES (?, ?, ?, ?)
      `;
      connection.query(sql, [pousadaID, idTelPrincipal, idTelAlternativo, email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};
