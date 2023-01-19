import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    nombres: [
      {
        type: String,
        required: true,
      },
    ],
    apellidos: [
      {
        type: String,
        required: true,
      },
    ],
    cedula: {
      type: Number,
      required: true,
      unique: true,
    },
    candidato: {
      ref: "Candidato",
      type: Schema.Types.ObjectId,
      default: null,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    genero: {
      type: Boolean,
      required: true,
    },
    voto: {
      type: Boolean,
      default: false,
      required: true,
    },
    contrasenia: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Usuario", schema);
