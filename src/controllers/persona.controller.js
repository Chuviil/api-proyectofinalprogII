import Persona from "../models/Persona";
import Candidato from "../models/Candidato";
import Votante from "../models/Votante";

export const crearPersona = async (req, res) => {
  const {
    nombres,
    apellidos,
    fechaNacimiento,
    cedula,
    contrasenia,
    parroquia,
    genero,
    dignidad,
  } = req.body;
  // if (
  //   !nombres ||
  //   !apellidos ||
  //   !validator.isDate(fechaNacimiento + "") ||
  //   isNaN(cedula) ||
  //   !validator.isAlphanumeric(contrasenia + "") ||
  //   !parroquia ||
  //   !genero
  // ) {
  //   return res.status(400).json({ message: "Datos enviados no validos" });
  // }
  const personaEncontrada = await Persona.findOne({ cedula }).lean();

  if (personaEncontrada) {
    return res.status(400).json({ message: "Esta cedula ya esta registrada" });
  }

  if (dignidad) {
    await Candidato.create(
      {
        nombres,
        apellidos,
        fechaNacimiento,
        cedula,
        contrasenia,
        parroquia,
        genero,
        dignidad,
      },
      (error, nuevoCandidato) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(201).json({ nuevoCandidato });
      }
    );
  }

  await Votante.create(
    {
      nombres,
      apellidos,
      fechaNacimiento,
      cedula,
      contrasenia,
      parroquia,
      genero,
    },
    (error, nuevoVotante) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(201).json({ nuevoVotante });
    }
  );
};

export const obtenerPersonas = async (req, res) => {
  const personas = await Persona.find({}, { _id: 0, __v: 0 });
  res.status(200).json(personas);
};

export const obtenerPersona = async (req, res) => {
  const { cedula } = req.params;
  const { contrasenia } = req.query;

  const personaEncontrada = await Persona.findOne(
    { cedula },
    { _id: 0, __v: 0 }
  ).lean();

  if (!personaEncontrada) {
    return res
      .status(400)
      .json({ message: "Persona con esta cedula no encontrada" });
  }

  if (contrasenia === personaEncontrada.contrasenia) {
    return res.status(200).json(personaEncontrada);
  }

  return res.status(400).json({ message: "Contraseña incorrecta" });
};
