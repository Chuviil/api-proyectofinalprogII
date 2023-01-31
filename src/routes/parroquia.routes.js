import { Router } from "express";
import { crearParroquia } from "../controllers/parroquia.controller";

const router = Router();

router.post("/", crearParroquia);

export default router;