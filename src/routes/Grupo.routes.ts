import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const Grupodb = require("../modelos/Grupos");

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  getGrupos()
    .then((listaGrupos) => {
      res.json({
        code: 200,
        grupos: listaGrupos,
      });
    })
    .catch();
});

router.route("/").post((req: Request, res: Response) => {
  let { grupo } = req.body;
  grupo = JSON.parse(grupo);
  const grupoGuardar = new Grupodb(grupo);
});

router.route("/test").get((req: Request, res: Response) => {
  res.status(200).json({ titulo: "Titulo", contenido: "Este es el contenido" });
});

router.route("/api").get(async (req: Request, res: Response) => {
  const conn = await mongoose.connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  if (conn) {
    res.json({ estado: "Connected" });
  }

  if (!conn) {
    res.json({ estado: "Disconected" });
  }
  // res.json({ conn });
});

const getGrupos = async () => {
  const lista = await Grupodb.find();
  return lista;
};

export default router;
