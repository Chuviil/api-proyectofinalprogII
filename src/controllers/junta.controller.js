import Junta from "../models/Junta";
import Padron from "../models/Padron";

export const crearJunta = async (req, res) => {
  const { numero, genero, padron } = req.body;
  if (!numero || !genero || !padron) {
    return res.status(400).json({
      message: "Datos enviados no validos",
    });
  }
  const { ciudad, nombreLugar } = padron;
  const padronEncontrado = await Padron.findOne(
    { ciudad, nombreLugar },
    { _id: 1, juntas: 1 }
  ).lean();
  if (!padronEncontrado)
    return res.status(400).json({ message: "Padron no encontrado" });
  const juntaEncontrada = await Junta.findOne(
    { ciudad, nombreLugar },
    { _id: 1 }
  ).lean();
  let yaExisteEnPadron = false;
  if (juntaEncontrada) {
    padronEncontrado.juntas.forEach((junta) => {
      if (junta.toString() === juntaEncontrada._id.toString()) {
        yaExisteEnPadron = true;
      }
    });
  }
  if (yaExisteEnPadron) {
    return res
      .status(400)
      .json({ message: "Esta junta ya existe en el padron" });
  }
  const nuevaJunta = new Junta({ numero, genero });
  const juntaCreada = await nuevaJunta.save();
  await Padron.findByIdAndUpdate(padronEncontrado._id, {
    $push: {
      juntas: juntaCreada._id,
    },
  });
  return res.status(201).json(juntaCreada);
};
