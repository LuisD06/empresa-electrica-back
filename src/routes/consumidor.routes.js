import { Router } from "express";
import { methods as consumidorController } from "../controllers/consumidor.controller";

const router = Router();

router.get("/:id", consumidorController.getConsumidor);
router.post("/login", consumidorController.login);
router.post("/", consumidorController.addConsumidor);


export default router;