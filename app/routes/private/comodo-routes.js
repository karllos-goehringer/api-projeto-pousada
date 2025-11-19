import { Router } from "express";
import comodoController from "../../controllers/private/comodo-controller.js";
const router = Router();
router.get("/comodos/get-comodos/:idPousada", comodoController.getComodos);
router.get("/comodos/getComodoById/:idComodo", comodoController.getComodoById);
router.post("/comodos/create-comodo", comodoController.createComodo);
router.put("/comodos/update-comodo/:comodoID", comodoController.updateComodo);
router.delete("/comodos/delete-comodo/:PK_comodoID", comodoController.deleteComodo);
export default router;
