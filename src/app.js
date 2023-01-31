import express from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";
import listaRoutes from "./routes/lista.routes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/personas", usuarioRoutes);

app.use("/api/listas", listaRoutes);

export default app;
