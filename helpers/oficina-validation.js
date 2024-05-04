const oficina = require("../models/oficina");

const nombreExiste = async (nombre = "") => {
  const isNombre = await oficina.findOne({ nombre });
  if (isNombre) {
    throw new Error("Ya existe una oficina con ese nombre");
  }
};

const ubicacionExiste = async (ubicacion = "") => {
  const isUbicacion = await oficina.findOne({ ubicacion });
  if (isUbicacion) {
    throw new Error("Ya existe una oficina en esa ubicacion");
  }
};

const celularExiste = async (celular = "") => {
  const isCelular = await oficina.findOne({ celular });
  if (isCelular) {
    throw new Error("Ya existe una oficina con ese celular");
  }
};

module.exports = {
  nombreExiste,
  ubicacionExiste,
  celularExiste,
};
