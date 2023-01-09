import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    genero: {
      type: Boolean,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    discapacitado: {
      type: Boolean,
      required: true,
      default: false,
    },
    terceraEdad: {
      type: Boolean,
      required: true,
      default: false,
    },
    militar: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Cedula", schema);
