import { Router } from "express";
import { methods as reporteController } from "../controllers/reporte.controller.js";

const router = Router();

router.post("/month", reporteController.getByMonth);
router.get("/", reporteController.getAll);
router.post("/", reporteController.createReport);
router.post("/medidor", reporteController.createReportByMedidor);

export default router;