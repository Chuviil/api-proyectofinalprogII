import { Router } from "express";
import * as candidatoCtrl from "../controllers/candidato.controller";

const router = Router();

router.post("/", candidatoCtrl.crearCandidato);

export default router;
