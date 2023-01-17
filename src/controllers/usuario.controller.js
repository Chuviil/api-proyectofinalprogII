import Usuario from "../models/Usuario";
import Cedula from "../models/Cedula";
import Padron from "../models/Padron";
import validator from "validator";

export const crearUsuario = async (req, res) => {
  const { cedula, vocal, padron, junta } = req.body;
  if (!cedula || !padron || !junta || isNaN(cedula) || isNaN(junta)) {
    return res.status(400).json({ message: "Datos enviados no validos" });
  }
  const cedulaEncontrada = await Cedula.findOne({ id: cedula }).lean();
  if (!cedulaEncontrada) {
    return res.status(400).json({ message: "Cedula no encontrada" });
  }
  const usuarioEncontrado = await Usuario.findOne({
    cedula: cedulaEncontrada._id,
  }).lean();
  if (usuarioEncontrado)
    return res.status(400).json({ message: "Este usuario ya esta registrado" });
  const { ciudad, nombreLugar } = padron;
  const padronEncontrado = await Padron.findOne({ ciudad, nombreLugar }).lean();
  if (!padronEncontrado) {
    return res.status(400).json({ message: "Padron no encontrado" });
  }

  const nuevoUsuario = new Usuario({
    cedula: cedulaEncontrada._id,
    padron: padronEncontrado._id,
    junta,
  });

  if (validator.isBoolean(vocal + "")) nuevoUsuario.vocal = vocal;

  const usuarioCreado = await nuevoUsuario.save();
  res.status(201).json(usuarioCreado);
};

export const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, { createdAt: 0, updatedAt: 0 })
    .populate({
      path: "cedula",
      select: "-createdAt -updatedAt",
    })
    .populate({ path: "padron", select: "-createdAt -updatedAt" });
  res.status(200).json(usuarios);
};

export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ message: "El parametro de busqueda tiene que ser un numero" });
  }
  const cedulaEncontrada = await Cedula.findOne({ id }, { _id: 1 }).lean();
  if (!cedulaEncontrada)
    return res.status(400).json({ message: "Cedula no encontrada" });
  const usuarioEncontrado = await Usuario.findOne(
    { cedula: cedulaEncontrada._id.toString() },
    {
      createdAt: 0,
      updatedAt: 0,
    }
  )
    .populate({ path: "cedula", select: "-createdAt -updatedAt" })
    .populate({
      path: "padron",
      select: "-createdAt -updatedAt",
    });
  if (!usuarioEncontrado) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res.status(200).json(usuarioEncontrado);
};
