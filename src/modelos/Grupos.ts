import { Mensajes, MensajeSchema } from "./Mensajes";
import { Personas, PersonaSchema } from "./Personas";
import { Schema, model } from "mongoose";

/*const PersonaGrupoSchema = new Schema({
  rol: { type: String },
  persona: { type: Schema.ObjectId, ref: 'Personas' }
});*/

const GrupoSchema = new Schema({
  nombre: { type: String, required: true },
  personas: { type: [PersonaSchema], default: [] },
  mensajes: { type: [MensajeSchema], default: [] },
  grupo: { type: Number, default: 101 },
});

export interface Grupo {
  _id?: string;
  nombre: string;
  personas: [Personas];
  mensajes: [Mensajes];
  grupo?: number;
  facultad?: string;
  carrera?: string;
  persona?: string;
}

module.exports = model("Grupos", GrupoSchema);
