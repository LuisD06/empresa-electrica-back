import { Router } from "express";
import { methods as medidorController } from "../controllers/medidor.controller";

const router = Router();

router.get("/", medidorController.getAsync);
router.post("/day", medidorController.getByDayAsync);

export default router;