import connection from "../../../config/dbConnection.js";

class UserModel {
  updateUser(id, email, senha, nome) {
    const sql = `
      UPDATE usuarios 
      SET email = ?, senha = ?, nome = ? 
      WHERE idUser = ?
    `;

    return connection.promise().query(sql, [email, senha, nome, id])
      .then(([result]) => result);
  }

  deleteUser(id) {
    const sql = `
      DELETE FROM usuarios 
      WHERE idUser = ?
    `;

    return connection.promise().query(sql, [id])
      .then(([result]) => result);
  }

  getUserData(id) {
    const sql = `
      SELECT * FROM usuarios 
      WHERE idUser = ?
    `;
    return connection.promise().query(sql, [id])
      .then(([result]) => result);
  }
}

export default new UserModel();
