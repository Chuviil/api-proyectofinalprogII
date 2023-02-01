import { Router } from "express";
import { agregarVotoElectronico } from "../controllers/votoElectronico.controller";

const router = Router();

router.post("/", agregarVotoElectronico);

router.post("/:cedula", modificarEstadoVotacion);

export default router;