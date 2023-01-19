import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    dignidad: String,
    votos: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Candidato", schema);
