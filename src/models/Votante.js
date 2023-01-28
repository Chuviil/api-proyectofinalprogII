import { Schema } from "mongoose";
import Persona from "./Persona";

const votanteSchema = new Schema({
  voto: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default Persona.discriminator("Votante", votanteSchema);
