const Router = require("express")
const methods = require("../controllers/medicion.controller.js")

const router = Router();

router.get("/", methods.methods.getAsync);
router.post("/day", methods.methods.getByDayAsync);
router.post("/month", methods.methods.getByMonthAsync);
router.post("/generate", methods.methods.generateAsync);

module.exports = {
  router
}