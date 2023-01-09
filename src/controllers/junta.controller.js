import Junta from "../models/Junta";
import Padron from "../models/Padron";

export const obtenerJuntas = async (req, res) => {
  const juntas = await Junta.find();
  return res.status(200).json(juntas);
};

export const crearJunta = async (req, res) => {
  const { numero, genero, padron } = req.body;
  if (!numero || !("genero" in req.body) || !padron) {
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
    { numero, genero },
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

export const obtenerJuntaPorNumero = async (req, res) => {
  if (isNaN(req.params.numero)) {
    return res.status(400).json({
      message: "El parametro despues del / debe ser un número",
    });
  }
  const juntasEncontradas = await Junta.find({ numero: req.params.numero });
  return res.status(200).json(juntasEncontradas);
};
