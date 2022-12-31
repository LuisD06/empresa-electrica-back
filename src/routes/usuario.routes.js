import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";

const router = Router();

router.post("/", usuarioController.createAsync);
router.post("/login", usuarioController.loginAsync);
router.post("/operator", usuarioController.createOperatorAsync);



export default router;