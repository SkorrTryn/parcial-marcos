const { Router } = require("express");
const { check } = require("express-validator");
const inmuebleController = require("../controllers/inmueble");
const { validation } = require("../helpers/validation");
const {
  referenciaExiste,
  tipoAdecuado,
  modoAdecuado,
  existeOficina,
} = require("../helpers/inmuebles-validation");
const routerInmuebles = Router();

// crear un nuevo inmueble
routerInmuebles.post(
  "/crear",
  [
    check(
      "numeroReferencia",
      "El numero de referencia no puede estar vacio"
    ).notEmpty(),
    check("numeroReferencia").custom(referenciaExiste),
    check("superficie", "La superficie no puede estar vacia").notEmpty(),
    check("direccionCompleta", "La direccion no puede estar vacia").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("tipo").custom(tipoAdecuado),
    check("precioVenta", "El precio de venta no puede estar vacio").notEmpty(),
    check(
      "precioAlquiler",
      "El precio de alquiler no puede estar vacio"
    ).notEmpty(),
    check("oficinaNombre", "La oficina no puede estar vacia").notEmpty(),
    check("oficinaNombre").custom(existeOficina),
    check("modoOferta", "El modo de oferta no puede estar vacio").notEmpty(),
    check("modoOferta").custom(modoAdecuado),
    check(
      "nombrePropietario",
      "El nombre del propietario no puede estar vacio"
    ).notEmpty(),
    check(
      "telefonoPropietario",
      "El telefono del propietario no puede estar vacio"
    ).notEmpty(),
    validation,
  ],
  inmuebleController.crearInmueble
);

// registrar una visita a un inmueble
routerInmuebles.post(
  "/visitas/:numeroReferencia",
  [check("numeroReferencia").notEmpty(), validation],
  inmuebleController.registrarVisita
);

// obtener detalles de un inmueble por su número de referencia
routerInmuebles.get(
  "/:numeroReferencia",
  [check("numeroReferencia").notEmpty(), validation],
  inmuebleController.obtenerInmueblePorReferencia
);

// listar inmuebles disponibles para venta o alquiler
routerInmuebles.get("/", inmuebleController.listarInmueblesDisponibles);



module.exports = routerInmuebles;
