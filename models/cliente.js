const { Schema, model } = require("mongoose");

const clienteSchema = new Schema({
  nombres: { type: String, required: true },
  documento: { type: String, required: true },
  celular: { type: Number, required: true },
  correo: { type: String, required: true },
  ciudad: { type: String, required: true },
});

clienteSchema.methods.toJSON = function () {
  const { __v, ...cliente } = this.toObject();
  return cliente;
};

module.exports = model("Cliente", clienteSchema);
