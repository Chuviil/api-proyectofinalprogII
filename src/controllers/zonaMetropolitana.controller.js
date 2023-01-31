import ZonaMetropolitana from "../models/ZonaMetropolitana";

export const crearZonaMetropolitana = async (req, res) => {
  const { administracionZonal } = req.body;
  await ZonaMetropolitana.create(
    {
      administracionZonal,
    },
    (error, nuevaAdministracionZonal) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      return res
        .status(201)
        .json({ message: "Zona Creada", nuevaAdministracionZonal });
    }
  );
};
