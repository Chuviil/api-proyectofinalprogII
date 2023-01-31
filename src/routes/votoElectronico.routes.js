import { Router } from "express";
import { agregarVotoElectronico } from "../controllers/votoElectronico.controller";

const router = Router();

router.post("/", agregarVotoElectronico);

export default router;