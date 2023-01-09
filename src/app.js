import express from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuario.routes";
import cedulaRoutes from "./routes/cedula.routes";
import padronRoutes from "./routes/padron.routes";
import juntasRoutes from "./routes/junta.routes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cedulas", cedulaRoutes);
app.use("/api/padrones", padronRoutes);
app.use("/api/juntas", juntasRoutes);
export default app;
