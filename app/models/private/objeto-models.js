import connection from "../../../config/dbConnection.js";

class ObjetoModel {
  getObjetosByComodo(idComodo, callback) {
    const sql = `
      SELECT PK_objID, objNome, objMarca, objUnidades, objLink, objImagem
      FROM objetos
      WHERE PFK_comodoID = ?
    `;
    connection.query(sql, [idComodo], callback);
  }

  // Criar objeto
  createObjeto(data, callback) {
    const sql = `
      INSERT INTO objetos (PFK_comodoID, objNome, objMarca, objUnidades, objLink, objImagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.PFK_comodoID,
      data.objNome,
      data.objMarca,
      data.objUnidades,
      data.objLink,
      data.objImagem,
    ];
    connection.query(sql, params, callback);
  }

  // Atualizar objeto
  updateObjeto(id, data, callback) {
    const sql = `
      UPDATE objetos
      SET objNome = ?, objMarca = ?, objUnidades = ?, objLink = ?, 
          ${data.objImagem ? "objImagem = ?, " : ""} 
          PFK_comodoID = PFK_comodoID
      WHERE PK_objID = ?
    `;

    const params = data.objImagem
      ? [data.objNome, data.objMarca, data.objUnidades, data.objLink, data.objImagem, id]
      : [data.objNome, data.objMarca, data.objUnidades, data.objLink, id];

    connection.query(sql, params, callback);
  }

  // Buscar imagem antes de deletar
  getImagemById(id, callback) {
    const sql = "SELECT objImagem FROM objetos WHERE PK_objID = ?";
    connection.query(sql, [id], callback);
  }

  // Deletar objeto
  deleteObjeto(id, callback) {
    const sql = "DELETE FROM objetos WHERE PK_objID = ?";
    connection.query(sql, [id], callback);
  }
};

export default new ObjetoModel();