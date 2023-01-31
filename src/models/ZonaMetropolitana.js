import { model, Schema } from "mongoose";

const zonaMetropolitanaSchema = new Schema({
  administracionZonal: {
    type: String,
    required: true,
    enum: [
      "LA_DELICIA",
      "CALDERON",
      "EUGENIO_ESPEJO",
      "MANUELA_SAENZ",
      "ELOY_ALFARO",
      "QUITUMBE",
      "LOS_CHILLOS",
      "TUMBACO",
    ],
    unique: true,
  },
  parroquias: [
    { type: Schema.Types.ObjectId, ref: "Parroquia", default: null },
  ],
});

export default model(
  "ZonaMetropolitana",
  zonaMetropolitanaSchema,
  "zonasmetropolitanas"
);
