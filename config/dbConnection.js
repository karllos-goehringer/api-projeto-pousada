import { createConnection } from 'mysql2';
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pousada'
});
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
    return;
  }
  console.log('Conectado ao banco MySQL!');
});
export default connection;