import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
export function refreshTokenMiddleware(req, res, next) {
  const token = req.auth;
  
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.decode(token); 
    if (!decoded) {
      return next();
    }
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - now;
    if (timeRemaining < 900) {
      const newToken = jwt.sign(
        {
          id: decoded.id,
          email: decoded.email,
        },
        jwtSecret,
        { expiresIn: '1h' }
      );
      res.set('X-New-Token', newToken);
    }
  } catch (error) {
    console.error('Erro ao processar token refresh:', error);
  }
  next();
}
