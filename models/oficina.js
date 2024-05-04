const { Schema, model } = require("mongoose");

const oficinaSchema = new Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  celular: { type: Number, required: true },
});

oficinaSchema.methods.toJSON = function () {
  const { __v, ...oficina } = this.toObject();
  return oficina;
};

module.exports = model("Oficina", oficinaSchema);
