import { Router } from "express";
import ComodoController from "../../controllers/private/comodo-controller.js";
const router = Router();
router.get("/comodos/get-comodos/:idPousada", ComodoController.getComodos);
router.get("/comodos/getComodoById/:idComodo", ComodoController.getComodoById);
router.post("/comodos/create-comodo", ComodoController.createComodo);
router.put("/comodos/update-comodo/:comodoID", ComodoController.updateComodo);
router.delete("/comodos/delete-comodo/:PK_comodoID", ComodoController.deleteComodo);
export default router;
