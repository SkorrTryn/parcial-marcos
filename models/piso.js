const mongoose = require("mongoose");
const Inmueble = require("./inmuebles");
const Schema = mongoose.Schema;

const PisoSchema = new Schema({
  zona: { type: String, required: true },
  habitaciones: { type: Number, required: true },
  baños: { type: Number, required: true },
  cocinas: { type: Number, required: true },
  gas: { type: Boolean, required: true },
  puertaBlindada: { type: Boolean, required: true },
  parquet: { type: Boolean, required: true },
});

// Discriminador para el submodelo "piso"
const Piso = Inmueble.discriminator("Piso", PisoSchema);

module.exports = Piso;
