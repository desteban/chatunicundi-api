import { Schema, model } from "mongoose";
import bccrypt from "bcrypt";

export const PersonaSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  token: { type: String, required: false },
  imagen: { type: String, required: false },
  codigo: { type: String, required: true, unique: true },
  docente: { type: Boolean, default: false },
  password: { type: String, required: true },
});

export interface Personas {
  _id?: string;
  nombre: string;
  apellido: string;
  token?: string;
  imagen?: string;
  docente?: boolean;
  codigo: string;
  password?: string;
  id_persona?: any;
}

module.exports = model("Personas", PersonaSchema);
