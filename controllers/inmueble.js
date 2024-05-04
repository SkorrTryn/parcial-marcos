const Inmueble = require("../models/inmuebles");
const Villa = require("../models/villa");
const Piso = require("../models/piso");
const Local = require("../models/local");

const inmuebleController = {
  crearInmueble: async (req, res) => {
    try {
      const tipoInmueble = req.body.tipo;
      let nuevoInmueble;

      switch (tipoInmueble) {
        case "Villa":
          nuevoInmueble = new Villa(req.body);
          break;
        case "Piso":
          nuevoInmueble = new Piso(req.body);
          break;
        case "Casa":
          nuevoInmueble = new Piso(req.body);
          break;
        case "Local":
          nuevoInmueble = new Local(req.body);
          break;
        default:
          throw new Error("Tipo de inmueble no válido");
      }

      await nuevoInmueble.save();

      res.status(201).json({
        mensaje: "Inmueble creado correctamente",
        inmueble: nuevoInmueble,
      });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al crear el inmueble", error: error.message });
    }
  },

  obtenerInmueblePorReferencia: async (req, res) => {
    const { numeroReferencia } = req.params;
    try {
      const inmueble = await Inmueble.findOne({ numeroReferencia });
      if (!inmueble) {
        return res.status(404).json({ mensaje: "Inmueble no encontrado" });
      }
      res.status(200).json({ inmueble });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener el inmueble",
        error: error.message,
      });
    }
  },

  listarInmueblesDisponibles: async (req, res) => {
    const { tipo, modoOferta } = req.query;
    const filtros = {};
    if (tipo) filtros.tipo = tipo;
    if (modoOferta) filtros.modoOferta = modoOferta;
    try {
      const inmuebles = await Inmueble.find({tipo, modoOferta});
      res.status(200).json({ inmuebles });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al listar los inmuebles",
        error: error.message,
      });
    }
  },

  registrarVisita: async (req, res) => {
    const { numeroReferencia } = req.params;
    try {
      const inmueble = await Inmueble.findOne({ numeroReferencia });
      if (!inmueble) {
        return res.status(404).json({ mensaje: "Inmueble no encontrado" });
      }
      const nuevaVisita = req.body;
      inmueble.visitas.push(nuevaVisita);
      await inmueble.save();
      res
        .status(200)
        .json({ mensaje: "Visita registrada correctamente", inmueble });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al registrar la visita",
        error: error.message,
      });
    }
  },
};

module.exports = inmuebleController;
