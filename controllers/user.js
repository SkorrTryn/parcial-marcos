const { response, request } = require("express");

const userController = {
  get: (req = request, res = response) => {
    const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

    res.json({
      ms: "get API - controller",
      q,
      nombre,
      apikey,
      page,
      limit,
    });
  },

  post: (req, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
      msg: "post API - controller",
      nombre,
      edad,
    });
  },

  put: (req, res = response) => {
    const { id } = req.params;

    res.json({
      msg: "put API - controller",
      id,
    });
  },

  patch: (req, res = response) => {
    res.json({
      msg: "patch API - controller",
    });
  },

  delete: (req, res = response) => {
    res.json({
      msg: "delete API - controller",
    });
  },
};

module.exports = userController;
