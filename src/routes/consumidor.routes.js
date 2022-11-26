import { Router } from "express";
import { methods as consumidorController } from "../controllers/consumidor.controller";

const router = Router();

router.get("/:id", consumidorController.getConsumidor);
router.post("/login", consumidorController.login);
router.post("/", consumidorController.addConsumidor);
router.post("/data", consumidorController.getData);
router.post("/medidor", consumidorController.createMedidor);


export default router;