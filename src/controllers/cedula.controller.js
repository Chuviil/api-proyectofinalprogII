import Cedula from "../models/Cedula";

export const crearCedula = async (req, res) => {
  const {
    id,
    nombre,
    genero,
    fechaNacimiento,
    discapacitado,
    terceraEdad,
    militar,
  } = req.body;
  if (!id || !nombre || !("genero" in req.body) || !fechaNacimiento) {
    return res.status(400).json({ message: "Datos enviados no validos" });
  }
  const cedulaEncontrada = await Cedula.findOne({ id });
  if (cedulaEncontrada) {
    return res.status(400).json({ message: "Esta cedula ya esta registrada" });
  }
  const nuevaCedula = new Cedula({
    id,
    nombre,
    genero,
    fechaNacimiento,
  });
  if (discapacitado) nuevaCedula.discapacitado = discapacitado;
  if (terceraEdad) nuevaCedula.terceraEdad = terceraEdad;
  if (militar) nuevaCedula.militar = militar;
  const cedulaCreada = await nuevaCedula.save();
  return res.status(201).json(cedulaCreada);
};

export const obtenerCedulas = async (req, res) => {
  const cedulas = await Cedula.find();
  return res.status(200).json(cedulas);
};
