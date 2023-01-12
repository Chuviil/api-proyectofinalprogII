import Padron from "../models/Padron";

export const obtenerPadrones = async (req, res) => {
  const padrones = await Padron.find();
  return res.status(200).json(padrones);
};

export const crearPadron = async (req, res) => {
  const { canton, parroquia, provincia, ciudad, nombreLugar } = req.body;
  if (
    !canton ||
    !parroquia ||
    !ciudad ||
    !provincia ||
    !nombreLugar
  ) {
    return res.status(400).json({
      message: "Datos enviados no validos",
    });
  }
  const nombreLugarEncontrado = await Padron.findOne({ nombreLugar });
  if (nombreLugarEncontrado)
    return res.status(400).json({ message: "Este Padron ya existe" });
  const nuevoPadron = new Padron({
    canton,
    parroquia,
    provincia,
    ciudad,
    nombreLugar,
  });
  const padronCreado = await nuevoPadron.save();
  return res.status(201).json(padronCreado);
};
