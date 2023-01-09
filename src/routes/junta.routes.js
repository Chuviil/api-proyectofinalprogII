import {Router} from "express";
import * as juntaCtrl from "../controllers/junta.controller";

const router = Router();

router.get("/", juntaCtrl.obtenerJuntas);

router.post("/", juntaCtrl.crearJunta);

export default router;