import { Router } from "express";
import {
  establecerFechaInicio,
  obtenerEleccion,
} from "../controllers/eleccion.controller";

const router = Router();

router.patch("/fecha", establecerFechaInicio);

router.get("/", obtenerEleccion);

export default router;
