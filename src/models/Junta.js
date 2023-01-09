import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    genero: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Junta", schema);