import VotoElectronico from "../models/VotoElectronico";
import Eleccion from "../models/Eleccion";

export const agregarVotoElectronico = async (req, res) => {
  const {
    candidatoAlcalde,
    candidatoPrefecto,
    listaConsejales,
    fechaVotacion,
    parroquia,
  } = req.body;
  await VotoElectronico.create(
    {
      candidatoAlcalde,
      candidatoPrefecto,
      listaConsejales,
      fechaVotacion,
      parroquia,
    },
    async (error, nuevoVotoElectronico) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { _id } = nuevoVotoElectronico;

      await Eleccion.findOneAndUpdate(
        {},
        {
          $push: {
            votosElectronicos: _id,
          },
        }
      );

      return res.status(201).json(nuevoVotoElectronico);
    }
  );
};
