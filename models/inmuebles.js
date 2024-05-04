const { Schema, model } = require("mongoose");

const inmuebleSchema = new Schema({
  numeroReferencia: { type: String, required: true },
  superficie: { type: Number, required: true },
  direccionCompleta: { type: String, required: true },
  tipo: { type: String, required: true },
  precioVenta: { type: Number, required: true },
  precioAlquiler: { type: Number, required: true },
  modoOferta: { type: String, required: true },
  nombrePropietario: { type: String, required: true },
  telefonoPropietario: { type: String, required: true },
  oficinaNombre: { type: String, required: true },
  visitas: [
    {
      clienteNombre: { type: String, required: true },
      clienteTelefono: { type: String, required: true },
      fecha: { type: String, required: true },
      comentario: { type: String, required: true },
    },
  ],
});

inmuebleSchema.methods.toJSON = function () {
  const { __v, ...inmueble } = this.toObject();
  return inmueble;
};

module.exports = model("Inmueble", inmuebleSchema);
