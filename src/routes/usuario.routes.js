import { Router } from "express";
import { crearPersona } from "../controllers/persona.controller";

const router = Router();

//router.get("/", usuarioCtrl.obtenerUsuarios);

router.post("/", crearPersona);

//router.get("/:cedula", usuarioCtrl.obtenerUsuario);

export default router;
