import connection from "../../../config/dbConnection.js";

class VerificacaoModel {

  createVerificacao(PFK_comodoID, objetosComodo, objetosPresentes, objetosFaltantes, dataVerificacao) {
    const sql = `
      INSERT INTO verificacoes
      (PFK_comodoID, jsonObjComodo, jsonObjPresentes, jsonObjFaltantes, dataVerificacao)
      VALUES (?, ?, ?, ?, ?)
    `;

    return connection.promise().query(sql, [
      PFK_comodoID,
      JSON.stringify(objetosComodo || []),
      JSON.stringify(objetosPresentes || []),
      JSON.stringify(objetosFaltantes || []),
      dataVerificacao
    ]).then(([result]) => result);
  }

  getVerificacoes(PFK_comodoID) {
    const sql = `
      SELECT * FROM verificacoes
      WHERE PFK_comodoID = ?
      ORDER BY dataVerificacao DESC
    `;

    return connection.promise().query(sql, [PFK_comodoID])
      .then(([rows]) => rows);
  }
}

export default new VerificacaoModel();
