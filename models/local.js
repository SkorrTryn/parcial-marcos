const mongoose = require("mongoose");
const Inmueble = require("./inmuebles");
const Schema = mongoose.Schema;

const LocalSchema = new Schema({
  zona: { type: String, required: true },
  puertasEntrada: { type: Number, required: true },
  diafono: { type: Boolean, required: true },
  acondicionado: { type: Boolean, required: true },
});

// Discriminador para el submodelo "local"
const Local = Inmueble.discriminator("Local", LocalSchema);

module.exports = Local;
