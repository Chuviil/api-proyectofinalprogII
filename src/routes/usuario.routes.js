import { Router } from "express";
import {crearPersona, obtenerPersona, obtenerPersonas} from "../controllers/persona.controller";

const router = Router();

router.get("/", obtenerPersonas);

router.post("/", crearPersona);

router.get("/:cedula", obtenerPersona);

export default router;
