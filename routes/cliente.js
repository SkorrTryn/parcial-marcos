const { Router } = require("express");
const { check } = require("express-validator");
const clienteController = require("../controllers/cliente");
const { validation } = require("../helpers/validation");
const {
  documentoExiste,
  correoExiste,
  celularExiste,
} = require("../helpers/cliente-validation");

const routerCliente = Router();

// crear un nuevo cliente
routerCliente.post(
  "/crear",
  [
    check("nombres").notEmpty(),
    check("documento").notEmpty(),
    check("documento").custom(documentoExiste),
    check("celular").notEmpty(),
    check("celular").custom(celularExiste),
    check("correo").notEmpty(),
    check("correo").isEmail(),
    check("correo").custom(correoExiste),
    check("ciudad").notEmpty(),
    validation,
  ],
  clienteController.crearCliente
);

// actualizar la información de un cliente existente
routerCliente.put(
  "/:id",
  [check("id", "Id invalida").isMongoId(), validation],
  clienteController.actualizarCliente
);

module.exports = routerCliente;
