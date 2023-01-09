import Usuario from "../models/Usuario";
import Cedula from "../models/Cedula";
import Padron from "../models/Padron";

export const crearUsuario = async (req, res) => {
  const { cedula, voto, vocal, padron } = req.body;
  if (!cedula || !padron) {
    return res.status(400).json({ message: "Datos enviados no validos" });
  }
  const cedulaEncontrada = await Cedula.findOne({ id: cedula });
  if (!cedulaEncontrada) {
    return res.status(400).json({ message: "Cedula no encontrada" });
  }
  const { ciudad, nombreLugar } = padron;
  const padronEncontrado = await Padron.findOne({ ciudad, nombreLugar });
  if (!padronEncontrado) {
    return res.status(400).json({ message: "Padron no encontrado" });
  }

  const nuevoUsuario = new Usuario({
    cedula: cedulaEncontrada._id,
    padron: padronEncontrado._id,
  });

  if (vocal) nuevoUsuario.vocal = vocal;
  if (voto) nuevoUsuario.voto = voto;

  const usuarioCreado = await nuevoUsuario.save();
  res.status(201).json(usuarioCreado);
};

export const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.status(200).json(usuarios);
}
