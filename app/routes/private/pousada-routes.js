import { Router } from "express";
import pousadaController from "../../controllers/private/pousada-controller.js";
const router = Router();

router.put(
  "/pousada-update-endereco/:id",
  pousadaController.updateEndereco
);

router.put(
  "/pousada-update-nome/:id",
  pousadaController.updateNome
);

router.get(
  "/get-pousada/:id",
  pousadaController.getByUser
);

router.get(
  "/get-pousada-details/:id",
  pousadaController.getDetails
);

router.delete(
  "/pousada/delete-pousada/:pousadaID",
  pousadaController.delete
);

router.put(
  "/pousada-update-contato/:id",
  (req, res) => res.json({ message: "TODO: mover para controller de contato" })
);

router.get(
  "/get-telefones-pousada/:idTelefone/:idTelefoneAlternativo",
  pousadaController.getTelefonesPousada
);

router.post(
  '/register',
  pousadaController.cadastrarPousada
)

export default router;
