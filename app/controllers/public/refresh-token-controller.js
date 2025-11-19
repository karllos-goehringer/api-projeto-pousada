// modules/auth/refresh/authRefresh.controller.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

class AuthRefreshController {
  refresh(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtSecret);

      const newToken = jwt.sign(
        {
          id: decoded.id,
          email: decoded.email,
        },
        jwtSecret,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Token renovado com sucesso",
        token: newToken,
      });
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  }
}

export default new AuthRefreshController();
