import { Router } from "express";
import AuthVerifyController from '../../controllers/public/verify-session-controller.js'
const router = Router();
router.get("/verify", (req, res) => AuthVerifyController.verify(req, res));
export default router;
