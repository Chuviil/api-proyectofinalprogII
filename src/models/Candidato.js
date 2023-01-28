import { Schema } from "mongoose";
import Persona from "./Persona";

const candidatoSchema = new Schema(
  {
    dignidad: {
      type: String,
      enum: ["ALCALDE", "PREFECTO", "CONCEJAL"],
      required: true,
    },
    votos: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default Persona.discriminator("Candidato", candidatoSchema);
