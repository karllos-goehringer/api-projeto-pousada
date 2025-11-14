import express, { json } from 'express';
import loginRoutes from './app/routes/public-routes/login-routes/login.js';
import registerRoute from './app/routes/public-routes/register-routes/register.js';
import atualizarComodo from './app/routes/private-routes/comodo/atualizar-comodo.js';
import criarComodo from './app/routes/private-routes/comodo/criar-comodo.js';
import obterComodos from './app/routes/private-routes/comodo/obter-comodos.js';
import deletarComodo from './app/routes/private-routes/comodo/deletar-comodo.js';
import obterObjetosComodo from './app/routes/private-routes/objeto/obter-objeto.js';
import criarObjeto from './app/routes/private-routes/objeto/criar-objeto.js';
import atualizarObjeto from './app/routes/private-routes/objeto/atualizar-objeto.js';
import deletarObjeto from './app/routes/private-routes/objeto/deletar-objeto.js';
import deletarUser from './app/routes/private-routes/usuario/deletar-user.js';
import atualizarUser from './app/routes/private-routes/usuario/atualizar-user.js';
import obterDadosUser from './app/routes/private-routes/usuario/obter-dados-user.js';
import atualizarPousada from './app/routes/private-routes/pousada/atualizar-pousada.js';
import criarPousada from './app/routes/private-routes/pousada/criar-pousada.js';
import obterPousadas from './app/routes/private-routes/pousada/obter-pousadas.js';
import deletarPousada from './app/routes/private-routes/pousada/deletar-pousada.js';
import ping from './app/routes/public-routes/test.js';
import iniciarServer from './config/server.js';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();
function appExec() {
  const app = express();
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('ERRO: AUTHENTICATION_TOKEN_SECRET não definido no .env');
    process.exit(1);
  }
  app.use(
    expressjwt({
      secret: jwtSecret,
      algorithms: ['HS256'],
      getToken: (req) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    }
  }).unless({
      path: [
        '/auth/login',
        '/auth/register',
        '/teste',
        '/test/ping',
        { url: /\/public\//, methods: ['GET', 'POST'] }
      ]
    })
  );
  app.use('/test', ping)
  app.use('/auth', loginRoutes);
  app.use('/auth', registerRoute);
  app.use('/comodo', atualizarComodo);
  app.use('/comodo', criarComodo);
  app.use('/comodo', obterComodos);
  app.use('/comodo', deletarComodo);
  app.use('/get', obterObjetosComodo);
  app.use('/objeto', criarObjeto);
  app.use('/objeto', atualizarObjeto);
  app.use('/objeto', deletarObjeto);
  app.use('/usuario', deletarUser);
  app.use('/usuario', atualizarUser);
  app.use('/usuario', obterDadosUser);
  app.use('/pousada', atualizarPousada);
  app.use('/pousada', criarPousada);
  app.use('/pousada', obterPousadas);
  app.use('/pousada', deletarPousada);
  iniciarServer(app);
}

appExec();