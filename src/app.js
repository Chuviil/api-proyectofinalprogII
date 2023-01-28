import express from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/personas", usuarioRoutes);

export default app;
