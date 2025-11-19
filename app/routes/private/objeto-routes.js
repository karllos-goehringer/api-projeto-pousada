import { Router } from "express";
import upload from "#config/multer";
import ObjetoController from "../../controllers/private/objeto-controller.js";

const router = Router();

router.get("/objeto/get-objetos-comodo/:idComodo", ObjetoController.getObjetos);
router.post("/objeto/create-objeto", upload.single("objImagem"), ObjetoController.createObjeto);
router.put("/objeto/update-objeto/:id", upload.single("objImagem"), ObjetoController.updateObjeto);
router.delete("/objeto/delete-objeto/:PK_objID", ObjetoController.deleteObjeto);

export default router;
