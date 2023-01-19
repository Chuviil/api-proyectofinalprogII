import validator from "validator";
import Usuario from "../models/Usuario";
import Candidato from "../models/Candidato";

export const crearCandidato = async (req, res) => {
  const { cedula, dignidad } = req.body;
  if (
    isNaN(cedula) ||
    !validator.isAlpha(dignidad + "", "es-ES", { ignore: " " })
  ) {
    return res.status(400).json({
      message: "Datos enviados no validos",
    });
  }
  const usuarioEncontrado = await Usuario.findOne({ cedula });
  if (!usuarioEncontrado) {
    return res.status(404).json({
      message: "Usuario para asignar candidato no encontrado",
    });
  }
  const nuevoCandidato = new Candidato({ dignidad });
  const candidatoCreado = await nuevoCandidato.save();
  await Usuario.findOneAndUpdate(
    { cedula },
    { $set: { candidato: candidatoCreado._id } }
  );
  res.status(201).json(candidatoCreado);
};
