const Cliente = require("../models/cliente");

const clienteController = {
  crearCliente: async (req, res) => {
    try {
      const nuevoCliente = new Cliente(req.body);
      await nuevoCliente.save();
      res
        .status(201)
        .json({
          mensaje: "Cliente creado correctamente",
          cliente: nuevoCliente,
        });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al crear el cliente", error: error.message });
    }
  },

  actualizarCliente: async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    try {
      const clienteActualizado = await Cliente.findByIdAndUpdate(
        id,
        datosActualizados,
        { new: true }
      );
      if (!clienteActualizado) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
      }
      res
        .status(200)
        .json({
          mensaje: "Cliente actualizado correctamente",
          cliente: clienteActualizado,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al actualizar el cliente",
          error: error.message,
        });
    }
  },
};

module.exports = clienteController;
