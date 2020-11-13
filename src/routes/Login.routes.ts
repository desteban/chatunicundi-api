import { Request, Response, Router } from "express";
import { Respuestahttp } from "../modelos/Respuestahttp";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const PersonasDB = require("../modelos/Personas");

const router = Router();

interface Ipersona {
  codigo: number;
  password: string;
}

let respuesta: Respuestahttp = { code: 200, tittle: "" };

router.route("/login").post(async (req: Request, res: Response) => {
  let json: Ipersona = JSON.parse(req.body.json);

  if (json.codigo && json.password) {
    let persona = await obtenerPersona(json.codigo);

    if (persona) {
      const compare = await bcrypt.compare(json.password, persona.password);

      if (compare === true) {
        respuesta.code = 200;
        respuesta.tittle = "Succes";
        respuesta.message = "Credenciales validas";
        respuesta.data = persona;

        res.status(respuesta.code).json(respuesta);
      }

      if (!compare) {
        respuesta.code = 400;
        respuesta.tittle = "Error";
        respuesta.message = "Credenciales invalidas";

        res.status(respuesta.code).json(respuesta);
      }
    }

    if (!persona) {
      respuesta.code = 400;
      respuesta.tittle = "Error";
      respuesta.message = "Credenciales invalidas";

      res.status(respuesta.code).json(respuesta);
    }
  }

  if (!json.codigo || !json.password) {
    respuesta.code = 400;
    respuesta.message = "Faltan datos";

    res.status(respuesta.code).json(respuesta);
  }
});

const obtenerPersona = async (codigo: number) => {
  const personadb = await PersonasDB.findOne({ codigo });
  return personadb;
};

export default router;
