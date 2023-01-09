import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    canton: {
      type: String,
      required: true,
    },
    parroquia: {
      type: String,
      required: true,
    },
    provincia: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    juntas: [
      {
        ref: "Junta",
        type: Schema.Types.ObjectId,
      },
    ],
    nombreLugar: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Padron", schema, "padrones");
