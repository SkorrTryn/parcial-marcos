const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, required: true },
  activo: { type: Boolean, default: true },
});

// Método para eliminar los campos __v y contraseña de la respuesta JSON
usuarioSchema.methods.toJSON = function () {
  const { __v, contraseña, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", usuarioSchema);
