const cliente = require("../models/cliente");

const documentoExiste = async (documento = "") => {
  const isDocumento = await cliente.findOne({ documento });
  if (isDocumento) {
    throw new Error("El documento ingresado ya existe");
  }
};

const correoExiste = async (correo = "") => {
  const isCorreo = await cliente.findOne({ correo });
  if (isCorreo) {
    throw new Error("El correo ingresado ya existe");
  }
};

const celularExiste = async (celular = "") => {
  const isCelular = await cliente.findOne({ celular });
  if (isCelular) {
    throw new Error("El celular ingresado ya existe");
  }
};

module.exports = {
  documentoExiste,
  correoExiste,
  celularExiste,
};
