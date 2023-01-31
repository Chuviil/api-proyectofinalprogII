import Lista from "../models/Lista";

export const crearLista = async (req, res) => {
  const { nombrePartido, numero } = req.body;

  await Lista.create(
    {
      nombrePartido,
      numero,
    },
    (error, listaCreada) => {
      if (error) return res.status(400).json({ message: error.message });
      return res.status(201).json({ listaCreada });
    }
  );
};

export const obtenerListas = async (req, res) => {
  const listas = await Lista.find({}, { __id: 0, __v: 0 });
  return res.status(200).json(listas);
};
