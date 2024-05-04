const inmuebles = require("../models/inmuebles");
const oficina = require("../models/oficina");

const referenciaExiste = async (numeroReferencia = "") => {
  const isReferencia = await inmuebles.findOne({ numeroReferencia });
  if (isReferencia) {
    throw new Error("Ya existe un inmueble con esa referencia");
  }
};

const tipoAdecuado = async (tipo = "") => {
  const Tipos = ["Piso", "Villa", "Casa", "Local"];
  if (!Tipos.includes(tipo)) {
    throw new Error("Tipo de inmueble invalido");
  }
};

const modoAdecuado = async (modoOferta = "") => {
  const Modos = ["En venta", "En alquiler"];
  if (!Modos.includes(modoOferta)) {
    throw new Error("Modo de oferta invalido");
  }
};

const existeOficina = async (oficinaNombre = "") => {
  const isOficina = await oficina.findOne({ nombre: oficinaNombre });
  if (!isOficina) {
    throw new Error("No existe una oficina con ese nombre");
  }
};

module.exports = {
  referenciaExiste,
  tipoAdecuado,
  modoAdecuado,
  existeOficina,
};
