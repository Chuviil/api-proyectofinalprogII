import { Router } from "express";

const router = Router();

import * as usuarioCtrl from "../controllers/usuario.controller";

router.get("/", usuarioCtrl.obtenerUsuarios);

router.post("/", usuarioCtrl.crearUsuario);

router.get("/:id", usuarioCtrl.obtenerUsuario)

export default router;