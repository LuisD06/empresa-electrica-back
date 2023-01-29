import { Router } from "express";
import { methods as medidorController } from "../controllers/medidor.controller.js";

const router = Router();

router.post("/", medidorController.createAsync);
router.get("/", medidorController.getAsync);
router.get("/:suministro", medidorController.getBySuministroAsync);
router.get("/usuario/:usuario", medidorController.getInstancesByClient);

export default router;