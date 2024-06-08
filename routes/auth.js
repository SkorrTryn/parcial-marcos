const { Router } = require("express");
const { check } = require("express-validator");

const { validation } = require("../helpers/validation");
const { login } = require("../controllers/auth");

const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty(),
    validation,
  ],
  login
);

module.exports = authRouter;
