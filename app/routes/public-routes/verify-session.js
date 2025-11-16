import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const jwtSecret = process.env.JWT_SECRET;
// GET /auth/verify
// Verifica o token enviado no header Authorization: Bearer <token>
// Se válido: retorna { valid: true, user: { id, email }, token?: <newToken> }
// Se inválido/ausente: retorna { valid: false }
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ valid: false });
  }
  const token = authHeader.split(' ')[1];
  try {
    // Verifica e decodifica (lança se inválido/expirado)
    const decoded = jwt.verify(token, jwtSecret);
    // Calcula tempo restante
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - now;
    // Se faltar menos de 15 minutos, emite um novo token
    let newToken = null;
    if (timeRemaining < 900) {
      newToken = jwt.sign({ id: decoded.id, email: decoded.email }, jwtSecret, { expiresIn: '1h' });
      res.set('X-New-Token', newToken);
    }
    return res.json({ valid: true, user: { id: decoded.id, email: decoded.email }, token: newToken });
  } catch (err) {
    return res.json({ valid: false });
  }
});
export default router;