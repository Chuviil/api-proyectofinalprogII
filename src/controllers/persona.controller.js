import Persona from "../models/Persona";
import Candidato from "../models/Candidato";
import Votante from "../models/Votante";
import Parroquia from "../models/Parroquia";
import Lista from "../models/Lista";
import validator from "validator";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

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

  const personaEncontrada = await Persona.findOne({ cedula });

  if (personaEncontrada) {
    return res.status(400).json({ message: "Esta cedula ya esta registrada" });
  }

  const parroquiaEncontrada = await Parroquia.findOne({
    nombre: parroquia,
  }).lean();
  const parroquiaID = parroquiaEncontrada._id;

  if (dignidad) {
    await Candidato.create(
      {
        nombres,
        apellidos,
        fechaNacimiento,
        cedula,
        contrasenia,
        parroquia: parroquiaID,
        genero,
        dignidad,
      },
      async (error, nuevoCandidato) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(201).json({ nuevoCandidato });
      }
    );
  } else {
    await Votante.create(
      {
        nombres,
        apellidos,
        fechaNacimiento,
        cedula,
        contrasenia,
        parroquia: parroquiaID,
        genero,
      },
      async (error, nuevoVotante) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        await Parroquia.findByIdAndUpdate(parroquiaID, {
          $push: { votantes: nuevoVotante._id },
        });
        return res.status(201).json({ nuevoVotante });
      }
    );
  }
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

export const agregarDignidadCandidato = async (req, res) => {
  const { cedula } = req.params;
  const { numero } = req.query;

  console.log(`Cedula: ${cedula} NumeroLista: ${numero}`);

  const { dignidad, _id } = await Candidato.findOne({ cedula }).lean();

  switch (dignidad) {
    case "ALCALDE":
      const nuevaListaA = await Lista.findOneAndUpdate(
        { numero },
        { candidatoAlcalde: _id },
        { new: true }
      );
      await Candidato.findOneAndUpdate({ cedula }, { lista: nuevaListaA._id });
      return res
        .status(200)
        .json({ message: `Alcalde en lista ${numero} modificado` });
    case "PREFECTO":
      const nuevaListaP = await Lista.findOneAndUpdate(
        { numero },
        { candidatoPrefecto: _id },
        { new: true }
      );
      await Candidato.findOneAndUpdate({ cedula }, { lista: nuevaListaP._id });
      return res
        .status(200)
        .json({ message: `Prefecto en lista ${numero} modificado` });
    case "CONCEJAL":
      const nuevaListaC = await Lista.findOneAndUpdate(
        { numero },
        { $push: { candidatoAlcalde: _id } },
        { new: true }
      );
      await Candidato.findOneAndUpdate({ cedula }, { lista: nuevaListaC._id });
      return res
        .status(200)
        .json({ message: `Concejal agregado a la lista ${numero}` });
  }

  return res
    .status(400)
    .json({ message: "Ocurrio un error actualizando la lista" });
};
