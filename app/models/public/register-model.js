import connection from "../../../config/dbConnection.js";

class AuthRegisterModel {
  buscarEmail(email) {
    const sql = "SELECT * FROM user WHERE email = ?";
    return connection.promise().query(sql, [email]).then(([rows]) => rows);
  }

  criarUsuario(nome, senha, email, codRecuperacaoUnico) {
    const sql = `
      INSERT INTO user (nome, senha, email, codRecuperacaoUnico)
      VALUES (?, ?, ?, ?)
    `;
    return connection
      .promise()
      .query(sql, [nome, senha, email, codRecuperacaoUnico])
      .then(([result]) => result);
  }
}

export default new AuthRegisterModel();
