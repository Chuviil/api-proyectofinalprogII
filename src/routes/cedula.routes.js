import { Router } from "express";
import * as cedulaCtrl from "../controllers/cedula.controller";

const router = Router();

router.get("/", cedulaCtrl.obtenerCedulas);

router.post("/", cedulaCtrl.crearCedula);

router.get("/:id", cedulaCtrl.obtenerCedula);

export default router;
