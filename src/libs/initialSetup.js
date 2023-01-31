import Eleccion from "../models/Eleccion";

export const iniciarEleccion = async () => {
  try {
    const count = await Eleccion.estimatedDocumentCount();

    if (count > 0) return;

    const value = await Eleccion.create({ fid: 1 });

    console.log(`Eleccion Iniciada ${value}`);
  } catch (error) {
    console.error(error);
  }
};
