import Parroquia from "../models/Parroquia";

export const crearParroquia = async (req, res) => {
  const { nombre } = req.body;
  await Parroquia.create({ nombre }, (error, nuevaParroquia) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(201).json({ message: "Parroquia creada", nuevaParroquia });
  });
};
