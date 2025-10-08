import { Router } from "express";
import connection from "../../../../config/dbConnection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();
router.post('/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
    if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório.' });
  }
   sqlEmail = 'SELECT * FROM user WHERE email = ?';
  connection.query(sqlEmail, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
        return res.status(400).json({ error: 'E-mail não encontrado.' });
    }
    const user = results[0];  
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(token, 10);
    
    await PasswordReset.create({ userId: user.id, tokenHash: hash, expiresAt: Date.now() + 3600000 });
    
   // sendEmail(user.email, `https://app.com/reset-password?token=${token}`);
  }
  
  // Resposta genérica, mesmo se o e-mail não existir
  res.json({ message: 'Se existir uma conta, enviaremos um link de recuperação.' });
})});
export default router;