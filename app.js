import express, { json } from 'express';
import loginRoutes from './routes/public-routes/login-routes/login.js';
import registerRoute from './routes/public-routes/register-routes/register.js';

import atualizarComodo from './routes/private-routes/comodo/atualizar-comodo.js';
import criarComodo from './routes/private-routes/comodo/criar-comodo.js';
import obterComodos from './routes/private-routes/comodo/obter-comodos.js';
import deletarComodo from './routes/private-routes/comodo/deletar-comodo.js';
import obterObjetosComodo from './routes/private-routes/objeto/obter-objeto.js';

import criarObjeto from './routes/private-routes/objeto/criar-objeto.js';
import atualizarObjeto from './routes/private-routes/objeto/atualizar-objeto.js';
import deletarObjeto from './routes/private-routes/objeto/deletar-objeto.js';

import deletarUser from './routes/private-routes/usuario/deletar-user.js';
import obterDadosAllUser from './routes/private-routes/usuario/obter-dados-all-user.js';
import criarUser from './routes/private-routes/usuario/criar-user.js';
import atualizarUser from './routes/private-routes/usuario/atualizar-user.js';
import obterDadosUser from './routes/private-routes/usuario/obter-dados-user.js';

import atualizarPousada from './routes/private-routes/pousada/atualizar-pousada.js';
import criarPousada from './routes/private-routes/pousada/criar-pousada.js';
import obterPousadas from './routes/private-routes/pousada/obter-pousadas.js';
import deletarPousada from './routes/private-routes/pousada/deletar-pousada.js';

import testRoutes from './routes/public-routes/test-routes/test-routes.js';
import iniciarServer  from './config/server.js';
import cors from 'cors';
import crypto from 'crypto';
import jwt from 'express-jwt';
import 'dotenv/config';

const chaveSecreta = crypto.randomBytes(32).toString('hex');
console.log('Chave secreta gerada:', chaveSecreta);
function appExec() {
  const app = express();
  console.log('tentando iniciar server');
  iniciarServer(app);
  app.use(jwt({secret: process.env['authentication-token-secret'],}))
  app.use(cors());
  app.use(json());
  app.use(loginRoutes);
  app.use(registerRoute);
  app.use(atualizarComodo);
  app.use(criarComodo);
  app.use(obterComodos);
  app.use(deletarComodo);
  app.use(obterObjetosComodo);
  app.use(criarObjeto);
  app.use(atualizarObjeto);
  app.use(deletarObjeto);
  app.use(deletarUser);
  app.use(obterDadosAllUser);
  app.use(criarUser);
  app.use(atualizarUser);
  app.use(obterDadosUser);
  app.use(atualizarPousada);
  app.use(criarPousada);
  app.use(obterPousadas);
  app.use(deletarPousada);
  app.use(testRoutes);
  return app;
}

appExec();