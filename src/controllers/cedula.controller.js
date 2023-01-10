import Cedula from "../models/Cedula";
import validator from "validator";

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
  if (
    !id ||
    !nombre ||
    !("genero" in req.body) ||
    !fechaNacimiento ||
    isNaN(id) ||
    !validator.isBoolean(genero + "") ||
    !validator.isDate(fechaNacimiento + "") ||
    !validator.isAlpha(nombre + "", "es-ES", { ignore: " " })
  ) {
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
  if ("discapacitado" in req.body && validator.isBoolean(discapacitado + ""))
    nuevaCedula.discapacitado = discapacitado;
  if ("terceraEdad" in req.body && validator.isBoolean(terceraEdad + ""))
    nuevaCedula.terceraEdad = terceraEdad;
  if ("militar" in req.body && validator.isBoolean(militar + ""))
    nuevaCedula.militar = militar;
  const cedulaCreada = await nuevaCedula.save();
  return res.status(201).json(cedulaCreada);
};

export const obtenerCedulas = async (req, res) => {
  const cedulas = await Cedula.find({}, { createdAt: 0, updatedAt: 0 });
  return res.status(200).json(cedulas);
};

export const obtenerCedula = async (req, res) => {
  if (isNaN(req.params.id)) {
    return res
      .status(400)
      .json({ message: "El parametro de busqueda tiene que ser un numero" });
  }
  const cedula = await Cedula.findOne(
    { id: req.params.id },
    { createdAt: 0, updatedAt: 0 }
  );
  if (!cedula) {
    return res.status(404).json({ message: "Cedula no encontrada" });
  }
  return res.status(200).json(cedula);
};
