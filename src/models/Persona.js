import { model, Schema } from "mongoose";

const personaSchema = new Schema(
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
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    cedula: {
      type: Number,
      required: true,
    },
    contrasenia: {
      type: String,
      required: true,
    },
    parroquia: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      enum: ["MASCULINO", "FEMENINO"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Persona", personaSchema);
