import { Schema } from "mongoose";
import Persona from "./Persona";

const candidatoSchema = new Schema({
  dignidad: {
    type: String,
    enum: ["ALCALDE", "PREFECTO", "CONCEJAL"],
    required: true,
  },
  lista: {
    ref: "Lista",
    type: Schema.Types.ObjectId,
    default: null,
  },
});

export default Persona.discriminator("Candidato", candidatoSchema);
