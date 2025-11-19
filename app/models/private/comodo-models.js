import connection from "../../../config/dbConnection.js";

export default {
  getComodosByPousada(idPousada, callback) {
    const sql = "SELECT * FROM comodos WHERE PFK_pousadaID = ?";
    connection.query(sql, [idPousada], callback);
  },

  getComodoById(idComodo, callback) {
    const sql = "SELECT * FROM comodos WHERE PK_comodoID = ?";
    connection.query(sql, [idComodo], callback);
  },

  createComodo(data, callback) {
    const sql = `
      INSERT INTO comodos 
      (comodoNome, comodoTipo, descComodo, capacidadePessoas, comodoStatus, PFK_pousadaID)
      VALUES (?,?,?,?,?,?)
    `;

    const valores = [
      data.comodoNome,
      data.comodoTipo,
      data.descComodo,
      data.capacidadePessoas,
      data.comodoStatus,
      data.PFK_pousadaID,
    ];

    connection.query(sql, valores, callback);
  },

  updateComodo(comodoID, data, callback) {
    const sql = `
      UPDATE comodos
      SET
        PFK_pousadaID = ?,
        comodoNome = ?,
        comodoTipo = ?,
        descComodo = ?,
        capacidadePessoas = ?,
        comodoStatus = ?
      WHERE PK_comodoID = ?
    `;

    const valores = [
      data.PFK_pousadaID,
      data.comodoNome,
      data.comodoTipo,
      data.descComodo,
      data.capacidadePessoas,
      data.comodoStatus,
      comodoID,
    ];

    connection.query(sql, valores, callback);
  },

  deleteComodo(id, callback) {
    const sql = "DELETE FROM comodos WHERE PK_comodoID = ?";
    connection.query(sql, [id], callback);
  },
};
