const Router = require("express")
const methods = require("../controllers/medidor.controller.js")

const router = Router();

router.post("/", methods.methods.createAsync);
router.get("/", methods.methods.getAsync);
router.get("/:suministro", methods.methods.getBySuministroAsync);
router.get("/usuario/:usuario", methods.methods.getInstancesByClient);

module.exports = {
  router
}