import { Router } from "express";
import { crearZonaMetropolitana } from "../controllers/zonaMetropolitana.controller";

const router = Router();

router.post("/", crearZonaMetropolitana);

export default router;