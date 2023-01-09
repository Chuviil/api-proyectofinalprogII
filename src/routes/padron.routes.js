import {Router} from "express";
import * as padronCtrl from "../controllers/padron.controller";

const router = Router();

router.post("/", padronCtrl.crearPadron);
export default router;