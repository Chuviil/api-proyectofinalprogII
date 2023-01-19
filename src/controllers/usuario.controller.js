import Usuario from "../models/Usuario";
import validator from "validator";

export const crearUsuario = async (req, res) => {
  const {
    nombres,
    apellidos,
    cedula,
    fechaNacimiento,
    genero,
    voto,
    contrasenia,
  } = req.body;
  if (
    !nombres ||
    !apellidos ||
    !validator.isDate(fechaNacimiento + "") ||
    !validator.isBoolean(genero + "") ||
    isNaN(cedula) ||
    !validator.isAlphanumeric(contrasenia + "")
  ) {
    return res.status(400).json({ message: "Datos enviados no validos" });
  }
  const usuarioEncontrado = await Usuario.findOne({ cedula }).lean();
  if (usuarioEncontrado)
    return res
      .status(400)
      .json({ message: "Un usuario con esta cedula ya esta registrado" });
  const nuevaPersona = new Usuario({
    nombres,
    apellidos,
    cedula,
    fechaNacimiento,
    genero,
    contrasenia,
  });

  if (validator.isBoolean(voto + "")) nuevaPersona.voto = voto;

  const usuarioCreado = await nuevaPersona.save();
  res.status(201).json(usuarioCreado);
};

export const obtenerUsuarios = async (req, res) => {
  const personas = await Usuario.find(
    {},
    { _id: 0, createdAt: 0, updatedAt: 0 }
  );
  res.status(200).json(personas);
};

export const obtenerUsuario = async (req, res) => {
  const { cedula } = req.params;
  const { contrasenia } = req.body;
  console.log(contrasenia);
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
};
