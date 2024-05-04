const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const routerCliente = require("../routes/cliente");
const routerOficina = require("../routes/oficina");
const routerInmuebles = require("../routes/inmuebles");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.conectarDB();
    this.middlewares();
    this.routes();

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));

    
  }

  routes() {
    this.app.use("/api/cliente", routerCliente);
    this.app.use("/api/oficina", routerOficina);
    this.app.use("/api/inmuebles", routerInmuebles);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo correctamente en puerto", this.port);
    });
  }
}

module.exports = Server;
