import { Router } from "express";
import { establecerFechaInicio } from "../controllers/eleccion.controller";

const router = Router();

router.patch("/fecha", establecerFechaInicio);

export default router;