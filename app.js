import express, { json } from 'express';
import getRoutes from './app/routes/get.js';
import createRoutes from './app/routes/create.js';
import updateRoutes from './app/routes/update.js';
import deleteRoutes from './app/routes/delete.js';
import loginRoutes from './app/routes/public-routes/login.js';
import testRoutes from './app/test.js';
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
  app.use(getRoutes);
  app.use(createRoutes);
  app.use(updateRoutes);
  app.use(deleteRoutes);
  app.use(testRoutes);
}

appExec();