import express from 'express';
import userRoutes from './app/routes/private/usuario-routes.js'
import comodoRoutes from "./app/routes/private/comodo-routes.js";
import objetoRoutes from "./app/routes/private/objeto-routes.js";
import pousadaRoutes from "./app/routes/private/pousada-routes.js";
import verificacaoRoutes from "./app/routes/private/verificacao-routes.js";

import loginRoute from "./app/routes/public/login-route.js";
import refreshRoute from "./app/routes/public/refresh-token-route.js";
import registerRoute from "./app/routes/public/register-route.js";
import verifyRoute from "./app/routes/public/verify-session-route.js";
import pingRoute from "./app/routes/public/test-route.js";

import { refreshTokenMiddleware } from './app/middleware/tokenRefresh.js';
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
  app.use(express.urlencoded({ extended: true }));
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('ERRO: AUTHENTICATION_TOKEN_SECRET não definido no .env');
    process.exit(1);
  }
  app.use(
    expressjwt({
      secret: jwtSecret,
      algorithms: ['HS256']
    }).unless({
      path: [
        '/auth/login',
        '/auth/register',
        '/auth/refresh',
        '/auth/verify',
        '/teste',
        '/test/ping',
        { url: /\/public\//, methods: ['GET', 'POST'] },
        { url: /^\/uploads\/.*/, methods: ["GET"] },

      ]
    })
  );
  app.use(refreshTokenMiddleware);
  app.use("/uploads", express.static("uploads"));
  app.use('/test', pingRoute);
  app.use('/auth', loginRoute);
  app.use('/auth', registerRoute);
  app.use('/auth', refreshRoute);
  app.use('/auth', verifyRoute);
  app.use('/comodo', verificacaoRoutes);
  app.use('/comodo', comodoRoutes);
  app.use('/objeto', objetoRoutes);
  app.use('/usuario', userRoutes);
  app.use('/pousada', pousadaRoutes);
  iniciarServer(app);
}

appExec();