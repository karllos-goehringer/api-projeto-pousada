import express, { json } from 'express';
import loginRoutes from './app/routes/public-routes/login-routes/login.js';
import registerRoute from './app/routes/public-routes/register-routes/register.js';
import { authenticateToken } from './app/middleware/authenticateToken.js';
import atualizarComodo from './app/routes/private-routes/comodo/atualizar-comodo.js';
import criarComodo from './app/routes/private-routes/comodo/criar-comodo.js';
import obterComodos from './app/routes/private-routes/comodo/obter-comodos.js';
import deletarComodo from './app/routes/private-routes/comodo/deletar-comodo.js';
import obterObjetosComodo from './app/routes/private-routes/objeto/obter-objeto.js';
import criarObjeto from './app/routes/private-routes/objeto/criar-objeto.js';
import atualizarObjeto from './app/routes/private-routes/objeto/atualizar-objeto.js';
import deletarObjeto from './app/routes/private-routes/objeto/deletar-objeto.js';
import deletarUser from './app/routes/private-routes/usuario/deletar-user.js';
import obterDadosAllUser from './app/routes/private-routes/usuario/obter-dados-all-user.js';
import atualizarUser from './app/routes/private-routes/usuario/atualizar-user.js';
import obterDadosUser from './app/routes/private-routes/usuario/obter-dados-user.js';
import atualizarPousada from './app/routes/private-routes/pousada/atualizar-pousada.js';
import criarPousada from './app/routes/private-routes/pousada/criar-pousada.js';
import obterPousadas from './app/routes/private-routes/pousada/obter-pousadas.js';
import deletarPousada from './app/routes/private-routes/pousada/deletar-pousada.js';
import iniciarServer  from './config/server.js';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import 'dotenv/config';

function appExec() {
  const app = express();
  console.log('tentando iniciar server');
  iniciarServer(app);
  app.use(expressjwt({
  secret: process.env['authentication-token-secret'],
  algorithms: ['HS256'] 
}).unless({
  path: ['/login', '/register'] 
}));
  app.use(cors());
  app.use(json());
  app.use(loginRoutes);
  app.use(registerRoute);

  app.use(atualizarComodo, authenticateToken);
  app.use(criarComodo, authenticateToken);
  app.use(obterComodos, authenticateToken);
  app.use(deletarComodo, authenticateToken);
  app.use(obterObjetosComodo, authenticateToken);
  app.use(criarObjeto, authenticateToken);
  app.use(atualizarObjeto, authenticateToken);
  app.use(deletarObjeto, authenticateToken);
  app.use(deletarUser, authenticateToken);
  app.use(obterDadosAllUser, authenticateToken);
  app.use(atualizarUser, authenticateToken);
  app.use(obterDadosUser, authenticateToken);
  app.use(atualizarPousada, authenticateToken);
  app.use(criarPousada, authenticateToken);
  app.use(obterPousadas, authenticateToken);
  app.use(deletarPousada, authenticateToken);
  return app;
}

appExec();