const express = require("express");
const cors = require("cors");
const routesUser = require("../routes/user");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = process.env.USERPATH;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, routesUser);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo correctamente en puerto", this.port);
    });
  }
}

module.exports = Server;
