import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    cedula: {
      ref: "Cedula",
      type: Schema.Types.ObjectId,
      required: true,
    },
    voto: {
      type: Boolean,
      default: false,
      required: true,
    },
    vocal: {
      type: Boolean,
      default: false,
      required: true,
    },
    padron: {
      ref: "Padron",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Usuario", schema);
