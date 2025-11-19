import { Router } from "express";
import PousadaController from "../../controllers/private/pousada-controller.js";
const router = Router();

router.put( "/pousada-update-endereco/:id", PousadaController.updateEndereco);
router.put( "/pousada-update-nome/:id", PousadaController.updateNome);
router.get( "/get-pousada/:id", PousadaController.getByUser);
router.get("/get-pousada-details/:id",PousadaController.getDetails);
router.delete("/pousada/delete-pousada/:pousadaID",PousadaController.delete);
router.put("/pousada-update-contato/:id", PousadaController.updateContato);
router.get("/get-telefones-pousada/:idTelefone/:idTelefoneAlternativo",PousadaController.getTelefonesPousada);
router.post('/register',PousadaController.cadastrarPousada)

export default router;
