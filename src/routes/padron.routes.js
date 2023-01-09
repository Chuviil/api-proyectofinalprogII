import {Router} from "express";
import * as padronCtrl from "../controllers/padron.controller";

const router = Router();

router.get("/", padronCtrl.obtenerPadrones);

router.post("/", padronCtrl.crearPadron);
export default router;