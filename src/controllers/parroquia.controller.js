import Parroquia from "../models/Parroquia";
import ZonaMetropolitana from "../models/ZonaMetropolitana";

export const crearParroquia = async (req, res) => {
  const { nombre, zonaMetropolitana } = req.body;

  const zonaMetropolitanaEncontrada = ZonaMetropolitana.findOne({
    administracionZonal: zonaMetropolitana,
  }).lean();

  if (!zonaMetropolitanaEncontrada) {
    return res
      .status(400)
      .json({ message: "Zona de metropolitana no encontrada" });
  }

  await Parroquia.create({ nombre }, async (error, nuevaParroquia) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { _id } = nuevaParroquia;
    await ZonaMetropolitana.findOneAndUpdate(
      { administracionZonal: zonaMetropolitana },
      { $push: { parroquias: _id } }
    );
    res.status(201).json({ message: "Parroquia creada", nuevaParroquia });
  });
};
