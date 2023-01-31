import { Router } from "express";
import {crearLista, obtenerListas} from "../controllers/lista.controller";

const router = Router();

router.post("/", crearLista);

router.get("/", obtenerListas);

export default router;