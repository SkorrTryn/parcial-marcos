const mongoose = require("mongoose");
const Inmueble = require("./inmuebles");
const Schema = mongoose.Schema;

const VillaSchema = new Schema({
  tamañoParcela: { type: Number, required: true },
  urbanizacion: { type: String, required: true },
  habitaciones: { type: Number, required: true },
  banos: { type: Number, required: true },
  cocinas: { type: Number, required: true },
  gas: { type: Boolean, required: true },
  puertaBlindada: { type: Boolean, required: true },
  parquet: { type: Boolean, required: true },
});

const Villa = Inmueble.discriminator("Villa", VillaSchema);

module.exports = Villa;
