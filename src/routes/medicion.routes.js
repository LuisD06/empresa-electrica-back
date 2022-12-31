import { Router } from "express";
import { methods as medicionController } from "../controllers/medicion.controller";

const router = Router();

router.get("/", medicionController.getAsync);
router.post("/day", medicionController.getByDayAsync);
router.post("/month", medicionController.getByMonthAsync);

export default router;