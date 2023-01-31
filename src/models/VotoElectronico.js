import { model, Schema } from "mongoose";

const votoElectronicoSchema = new Schema({
  candidatoAlcalde: {
    ref: "Candidato",
    type: Schema.Types.ObjectId,
  },
  candidatoPrefecto: {
    ref: "Candidato",
    type: Schema.Types.ObjectId,
  },
  listaConsejales: {
    ref: "Lista",
    type: Schema.Types.ObjectId,
  },
  fechaVotacion: Date,
  parroquia: {
    type: Schema.Types.ObjectId,
    ref: "Parroquia",
  },
});

export default model(
  "VotoElectronico",
  votoElectronicoSchema,
  "votosElectronicos"
);
