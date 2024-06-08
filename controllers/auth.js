const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { correo, contrasena } = req.body;

  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / contrasena no son correctos - correo",
      });
    }

    // SI el usuario está activo
    if (!usuario.activo) {
      return res.status(400).json({
        msg: "Usuario / contrasena no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validcontrasena = bcryptjs.compareSync(
      contrasena,
      usuario.contrasena
    );
    if (!validcontrasena) {
      return res.status(400).json({
        msg: "Usuario / contrasena no son correctos - contrasena",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario._id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      error: error,
    });
  }
};

module.exports = {
  login,
};
