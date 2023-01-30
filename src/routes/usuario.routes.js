const express  = require("express");
const router = express.Router()
const methods = require( "../controllers/usuario.controller.js");



router.post("/", methods.methods.createAsync);
router.post("/login", methods.methods.loginAsync);
router.post("/operator", methods.methods.createOperatorAsync);
router.post("/verify", methods.methods.verifyExists);
router.get("/:cedula", methods.methods.getByCedula);
router.post("/medidor", methods.methods.addMedidor);


module.exports = {router};