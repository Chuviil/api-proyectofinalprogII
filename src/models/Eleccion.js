import { model, Schema } from "mongoose";

const eleccionSchema = new Schema({
  fid: {
    type: Number,
    required: true,
    unique: true,
  },
  fechaInicio: {
    type: Date,
    default: null,
  },
  fechaFin: {
    type: Date,
    default: null,
  },
  votosElectronicos: [
    {
      type: Schema.Types.ObjectId,
      default: null,
    },
  ],
  alcaldeGanador: {
    ref: "Candidato",
    type: Schema.Types.ObjectId,
    default: null,
  },
  prefectoGanador: {
    ref: "Candidato",
    type: Schema.Types.ObjectId,
    default: null,
  },
  listaConsejalesGanadora: {
    ref: "Lista",
    type: Schema.Types.ObjectId,
    default: null,
  },
});

export default model("Eleccion", eleccionSchema, "elecciones");
