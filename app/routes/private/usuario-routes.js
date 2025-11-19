import { Router } from "express";
import UserController from "../../controllers/private/usuario-controller.js";
const router = Router();

router.put("/user/atualizar-user/:idUser", UserController.updateUser);

router.delete("/user/delete-user/:idUser", UserController.deleteUser);

router.get("/user/get-user-data/:idUser", UserController.getUserData);

export default router;
