import { Router } from "express";
import AuthRefreshController from '../../controllers/public/refresh-token-controller.js'
const router = Router();

router.post("/refresh", (req, res) =>
  AuthRefreshController.refresh(req, res)
);

export default router;