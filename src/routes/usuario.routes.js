import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/", usuarioController.createAsync);
router.post("/login", usuarioController.loginAsync);
router.post("/operator", usuarioController.createOperatorAsync);
router.post("/verify", usuarioController.verifyExists);
router.get("/:cedula", usuarioController.getByCedula);
router.post("/medidor", usuarioController.addMedidor);



export default router;