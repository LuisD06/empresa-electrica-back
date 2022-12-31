import { Router } from "express";
import { methods as reporteController } from "../controllers/reporte.controller";

const router = Router();

router.post("/month", reporteController.getByMonth);
router.post("/", reporteController.createReport);

export default router;