const Router = require("express");
const methods = require("../controllers/reporte.controller.js")
const router = Router();

router.post("/month", methods.methods.getByMonth);
router.get("/", methods.methods.getAll);
router.post("/", methods.methods.createReport);
router.post("/medidor", methods.methods.createReportByMedidor);

module.exports = {
  router
}