import { Router } from "express";
import AuthController from '../../controllers/public/login-controller.js'
const router = Router();

router.post("/login", (req, res) => AuthController.login(req, res));

export default router;
