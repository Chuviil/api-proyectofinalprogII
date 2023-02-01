import VotoElectronico from "../models/VotoElectronico";
import Eleccion from "../models/Eleccion";
import Candidato from "../models/Candidato";
import Lista from "../models/Lista";
import Votante from "../models/Votante";

export const agregarVotoElectronico = async (req, res) => {
  const {
    candidatoAlcalde,
    candidatoPrefecto,
    listaConsejales,
    fechaVotacion,
    parroquia,
  } = req.body;

  let candidatoAlcaldeID = null,
    candidatoPrefectoID = null,
    listaConsejalesID = null;

  if (candidatoAlcalde !== null) {
    const candidatoAlcaldet = await Candidato.findOne({
      cedula: candidatoAlcalde,
    }).lean();
    candidatoAlcaldeID = candidatoAlcaldet._id;
    console.log(`Candidato no es nulo y su id es : ${candidatoAlcaldeID}`)
  }

  if (candidatoPrefecto !== null) {
    const candidatoPrefectoT = await Candidato.findOne({
      cedula: candidatoPrefecto,
    }).lean();
    candidatoPrefectoID = candidatoPrefectoT._id;
    console.log(`Prefecto no es nulo y su id es : ${candidatoPrefectoID}`)
  }

  if (listaConsejales !== null) {
    const candidatoAlcaldeT = await Lista.findOne({
      numero: listaConsejales,
    }).lean();
    listaConsejalesID = candidatoAlcaldeT._id;
  }

  await VotoElectronico.create(
    {
      candidatoAlcaldeID,
      candidatoPrefectoID,
      listaConsejalesID,
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

export const modificarEstadoVotacion = async (req, res) => {
  const { cedula } = req.params;
  await Votante.findOneAndUpdate({ cedula }, { voto: true });
  return res.status(200).json({ message: `Voto modificado para ${cedula}` });
};
