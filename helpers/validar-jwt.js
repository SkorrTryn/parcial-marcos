const jwt = require("jsonwebtoken");

const usuario = require("../models/usuario.js");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const checkusuario = await usuario.findById(uid);

    if (!checkusuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }

    // Verificar si el uid tiene estado true
    if (!checkusuario.activo) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.checkusuario = checkusuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { validarJWT };
