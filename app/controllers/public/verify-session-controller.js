// modules/auth/verify/authVerify.controller.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

class AuthVerifyController {
  verify(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ valid: false });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtSecret);

      const now = Math.floor(Date.now() / 1000);
      const timeRemaining = decoded.exp - now;

      let newToken = null;

      // Gera novo token se faltar menos de 15 min
      if (timeRemaining < 900) {
        newToken = jwt.sign(
          {
            id: decoded.id,
            email: decoded.email,
          },
          jwtSecret,
          { expiresIn: "1h" }
        );

        res.set("X-New-Token", newToken);
      }

      return res.json({
        valid: true,
        user: {
          id: decoded.id,
          email: decoded.email,
        },
        token: newToken,
      });
    } catch (error) {
      return res.json({ valid: false });
    }
  }
}

export default new AuthVerifyController();
