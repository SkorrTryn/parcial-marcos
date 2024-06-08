const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuarioController = {
  getUsuarioById: async (req, res) => {
    const { id } = req.params;
    try {
      const getusuario = await Usuario.findById(id);
      if (!getusuario) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado por id",
        });
      }
      res.status(200).json({
        ok: true,
        getusuario,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado... revisar logs",
      });
    }
  },

  createUser: async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;

    try {
      // Verificar si el correo ya existe
      const userExists = await Usuario.findOne({ correo });
      if (userExists) {
        return res.status(400).json({
          ok: false,
          msg: "El correo ya está registrado",
        });
      }

      // Crear el usuario con el modelo
      const newUser = new Usuario({ nombre, correo, contrasena, rol });

      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      newUser.contrasena = bcryptjs.hashSync(contrasena, salt);

      // Guardar usuario en la BD
      await newUser.save();

      res.status(201).json({
        ok: true,
        usuario: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  },
};

module.exports = usuarioController;
