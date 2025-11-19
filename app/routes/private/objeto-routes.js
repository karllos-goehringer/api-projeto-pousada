import { Router } from "express";
import upload from "#config/multer";
import {
  getObjetos,
  createObjeto,
  updateObjeto,
  deleteObjeto
} from "../../controllers/private/objeto-controller.js";

const router = Router();

// GET — Objetos do cômodo
router.get("/objeto/get-objetos-comodo/:idComodo", getObjetos);

// POST — Criar
router.post("/objeto/create-objeto", upload.single("objImagem"), createObjeto);

// PUT — Atualizar
router.put("/objeto/update-objeto/:id", upload.single("objImagem"), updateObjeto);

// DELETE — Remover
router.delete("/objeto/delete-objeto/:PK_objID", deleteObjeto);

export default router;
