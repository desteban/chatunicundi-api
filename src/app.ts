import express, { Application } from "express";
import { Socket } from "socket.io";
import { indexEventos } from "./eventos/index";
import { connection } from "./database";
import cors from "cors";
// import morgan from "morgan";

import GruposRutas from "./routes/Grupo.routes";
import Login from "./routes/Login.routes";

export class app {
  app: Application;
  server: any;
  SocketIO: any;

  constructor(private port?: number | string) {
    this.app = express();
    this.SocketIO = require("socket.io");
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    // definir el puerto
    this.app.set("port", this.port || process.env.PORT || 3500);
    connection();
  }

  middlewares() {
    // this.app.use(morgan("dev"));
    this.app.use(express.json());
    // datos de formulario
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  routes() {
    this.app.use(GruposRutas);
    this.app.use("/grupos", GruposRutas);
    this.app.use(Login);
  }

  async listen() {
    this.server = await this.app.listen(this.app.get("port"));
    console.log(`http://localhost:${this.app.get("port")}`);

    this.eventos();
  }

  eventos() {
    const io: Socket = this.SocketIO.listen(this.server);

    io.on("connection", (socket: SocketIO.Socket) => {
      //eventos
      console.log("New connection", socket.id);

      indexEventos(socket, io);
    });
  }
}
