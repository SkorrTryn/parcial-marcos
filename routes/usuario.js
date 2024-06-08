const { Router } = require("express");
const { check } = require("express-validator");
const usuarioController = require("../controllers/usuario");
const { validation } = require("../helpers/validation");

const routerUsuario = Router();

// Obtener un usuario por ID
routerUsuario.get(
  "/:id",
  [check("id", "Id invalida").isMongoId(), validation],
  usuarioController.getUsuarioById
);

// Crear un nuevo usuario
routerUsuario.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("correo", "El correo es obligatorio y debe ser válido").isEmail(),
    check(
      "contrasena",
      "La contraseña es obligatoria y debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("rol", "El rol es obligatorio").notEmpty(),
    validation,
  ],
  usuarioController.createUser
);

module.exports = routerUsuario;
