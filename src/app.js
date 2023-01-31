import express from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";
import listaRoutes from "./routes/lista.routes";
import {iniciarEleccion} from "./libs/initialSetup";
import votoElectronicoRoutes from "./routes/votoElectronico.routes";
import eleccionRoutes from "./routes/eleccion.routes";

const app = express();

iniciarEleccion();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/personas", usuarioRoutes);

app.use("/api/listas", listaRoutes);

app.use("/api/elecciones", eleccionRoutes);

app.use("/api/votosElectronicos", votoElectronicoRoutes);

export default app;
