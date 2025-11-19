import { Router } from "express";
import verificacaoController from "../../controllers/private/verificacao-controller.js";
const router = Router();

router.post(
  "/verificacao/:PFK_comodoID",
  (req, res) => verificacaoController.criarVerificacao(req, res)
);

router.get(
  "/get-verificacoes/:PFK_comodoID",
  (req, res) => verificacaoController.listarVerificacoes(req, res)
);

export default router;
