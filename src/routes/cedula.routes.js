import { Router } from "express";
import * as cedulaCtrl from "../controllers/cedula.controller";

const router = Router();

router.get("/", cedulaCtrl.obtenerCedulas);

router.post("/", cedulaCtrl.crearCedula);

export default router;
