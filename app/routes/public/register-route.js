import { Router } from "express";
import AuthRegisterController from "../../controllers/public/register-controller.js";
const router = Router();

router.post("/register", (req, res) =>
  AuthRegisterController.register(req, res)
);

export default router;
