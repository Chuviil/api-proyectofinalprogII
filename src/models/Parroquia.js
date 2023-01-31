import { model, Schema } from "mongoose";

const parroquiaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    enum: ["NANEGAL"],
    unique: true,
  },
  votantes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Votante",
      default: null,
    },
  ],
});

export default model("Parroquia", parroquiaSchema);
