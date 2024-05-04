const { Router } = require("express");
const { check } = require("express-validator");
const oficinaController = require("../controllers/oficina");
const { validation } = require("../helpers/validation");
const {
  nombreExiste,
  ubicacionExiste,
  celularExiste,
} = require("../helpers/oficina-validation");

const routerOficina = Router();

// crear una nueva oficina
routerOficina.post(
  "/crear",
  [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("nombre").custom(nombreExiste),
    check("ubicacion", "La ubicacion no puede estar vacia").notEmpty(),
    check("ubicacion").custom(ubicacionExiste),
    check("celular", "El celular no puede estar vacio").notEmpty(),
    check("celular").custom(celularExiste),
    validation,
  ],
  oficinaController.crearOficina
);

// actualizar la información de una oficina existente
routerOficina.put(
  "/:id",
  [check("id", "Id invalida").isMongoId(), validation],
  oficinaController.actualizarOficina
);

// eliminar una oficina
routerOficina.delete(
  "/:id",
  [check("id", "Id invalida").isMongoId(), validation],
  oficinaController.eliminarOficina
);

module.exports = routerOficina;
