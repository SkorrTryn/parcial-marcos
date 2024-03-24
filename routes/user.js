const { Router } = require("express");
const userController = require("../controllers/user");

const router = Router();

router.get("/", userController.get);
router.put("/:id", userController.put);
router.post("/", userController.post);
router.delete("/", userController.delete);
router.patch("/", userController.patch);

module.exports = router;
