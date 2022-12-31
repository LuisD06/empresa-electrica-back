import { Router } from "express";
import { methods as medidorController } from "../controllers/medidor.controller";

const router = Router();

router.post("/", medidorController.createAsync);
router.get("/", medidorController.getAsync);

export default router;