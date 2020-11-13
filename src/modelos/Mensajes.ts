import { Schema, model } from "mongoose";
import { Personas, PersonaSchema } from "./Personas";

export const MensajeSchema = new Schema({
  texto: { type: String, required: true },
  fecha: { type: Date, required: false, default: Date.now },
  usuario: { type: Schema.Types.ObjectId, ref: "Personas" },
});

export interface Mensajes {
  _id?: string;
  texto: string;
  fecha?: Date;
  usuario?: Personas;
}

module.exports = model("Mensajes", MensajeSchema);
