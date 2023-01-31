import { model, Schema } from "mongoose";

const listaSchema = new Schema({
  nombrePartido: {
    type: String,
    required: true,
    unique: true,
  },
  numero: {
    type: Number,
    required: true,
    unique: true,
  },
  candidatoAlcalde: {
    ref: "Candidato",
    type: Schema.Types.ObjectId,
    default: null,
  },
  candidatoPrefecto: {
    ref: "Candidato",
    type: Schema.Types.ObjectId,
    default: null,
  },
  candidatosConsejal: [
    {
      ref: "Candidato",
      type: Schema.Types.ObjectId,
      default: null,
    },
  ],
  votosAcalde: {
    type: Number,
    default: 0,
  },
  votosPrefecto: {
    type: Number,
    default: 0,
  },
  votosConsejales: {
    type: Number,
    default: 0,
  },
});

export default model("Lista", listaSchema);
