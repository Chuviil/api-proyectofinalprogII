import express from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";
import candidatoRoutes from "./routes/candidato.routes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/candidatos", candidatoRoutes);

export default app;
