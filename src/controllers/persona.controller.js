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

  if (personaEncontrada) {
    return res.status(400).json({ message: "Esta cedula ya esta registrada" });
  }

  const usuarioCreado = await nuevaPersona.save();
  res.status(201).json(usuarioCreado);
};

/*

export const obtenerUsuarios = async (req, res) => {
  const personas = await Usuario.find(
    {},
    { _id: 0, createdAt: 0, updatedAt: 0 }
  );
  res.status(200).json(personas);
};

export const obtenerUsuario = async (req, res) => {
  const { cedula } = req.params;
  const { contrasenia } = req.query;
  if (isNaN(cedula)) {
    return res
      .status(400)
      .json({ message: "El parametro de busqueda tiene que ser un numero" });
  }
  const personaEncontrada = await Usuario.findOne(
    { cedula },
    { _id: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (!personaEncontrada)
    return res
      .status(400)
      .json({ message: "Persona con esta cedula no encontrada" });
  if (contrasenia === personaEncontrada.contrasenia) {
    return res.status(200).json(personaEncontrada);
  }
  return res.status(400).json({ message: "Contraseña incorrecta" });
}; */
