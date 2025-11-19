import connection from "../../../config/dbConnection.js";
class AuthModel {
  buscarUsuarioPorEmail(email) {
    const sql = `
      SELECT PK_userID, nome, email, senha
      FROM user
      WHERE email = ?
    `;
    return connection.promise().query(sql, [email]).then(([rows]) => rows);
  }
}

export default new AuthModel();
