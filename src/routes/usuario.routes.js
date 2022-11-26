import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";

const router = Router();

router.post("/", usuarioController.createAsync);
router.post("/login", usuarioController.loginAsync);



export default router;