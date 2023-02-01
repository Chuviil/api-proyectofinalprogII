import Eleccion from "../models/Eleccion";

export const establecerFechaInicio = async (req, res) => {
  const { fechaInicio } = req.body;

  const nuevaEleccion = await Eleccion.findOneAndUpdate(
    {},
    {
      fechaInicio: new Date(fechaInicio + "T08:00:00-05:00"),
      fechaFin: new Date(fechaInicio + "T16:00:00-05:00"),
    },
    { new: true }
  );

  if (!nuevaEleccion) {
    return res.status(404).json({ message: "Eleccion no actualizada" });
  } else {
    return res
      .status(200)
      .json({ message: "Eleccion actualizada", nuevaEleccion });
  }
};

export const obtenerEleccion = async (req, res) => {
  const eleccion = await Eleccion.findOne({}, { __v: 0, _id: 0 }).populate({
    path: "votosElectronicos",
    model: "VotoElectronico",
    populate: [
      {
        path: "candidatoAlcalde",
      },
      {
        path: "candidatoPrefecto",
      },
      {
        path: "listaConsejales",
      },
      {
        path: "parroquia",
      },
    ],
  });

  return res.status(200).json(eleccion);
};
