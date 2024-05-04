const Oficina = require("../models/oficina");

const oficinaController = {
  crearOficina: async (req, res) => {
    try {
      const nuevaOficina = new Oficina(req.body);
      await nuevaOficina.save();
      res
        .status(201)
        .json({
          mensaje: "Oficina creada correctamente",
          oficina: nuevaOficina,
        });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al crear la oficina", error: error.message });
    }
  },

  actualizarOficina: async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    try {
      const oficinaActualizada = await Oficina.findByIdAndUpdate(
        id,
        datosActualizados,
        { new: true }
      );
      if (!oficinaActualizada) {
        return res.status(404).json({ mensaje: "Oficina no encontrada" });
      }
      res
        .status(200)
        .json({
          mensaje: "Oficina actualizada correctamente",
          oficina: oficinaActualizada,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al actualizar la oficina",
          error: error.message,
        });
    }
  },

  eliminarOficina: async (req, res) => {
    const { id } = req.params;
    try {
      const oficinaEliminada = await Oficina.findByIdAndDelete(id);
      if (!oficinaEliminada) {
        return res.status(404).json({ mensaje: "Oficina no encontrada" });
      }
      res.status(200).json({ mensaje: "Oficina eliminada correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al eliminar la oficina",
          error: error.message,
        });
    }
  },
};

module.exports = oficinaController;
