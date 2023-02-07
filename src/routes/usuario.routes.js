import { Router } from "express";
import {
    agregarDignidadCandidato,
    crearPersona,
    obtenerPersona,
    obtenerPersonas
} from "../controllers/persona.controller";

const router = Router();

router.get("/", obtenerPersonas);

router.post("/", crearPersona);

router.get("/:cedula", obtenerPersona);

router.patch("/candidato/lista/:cedula", agregarDignidadCandidato);

export default router;
