import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import usuarioRoutes from "./routes/usuario.routes.js";
import medidorRoutes from "./routes/medidor.routes.js";
import medicionRoutes from "./routes/medicion.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";

const app = express();

// Settings
app.set("port", 4001);
app.use(express.json());

// Middlewates
app.use(morgan("dev"));

// Cors
app.use(cors({
    origin: "http://localhost:3000"
}));

// Routes
app.use("/api/usuario",usuarioRoutes);
app.use("/api/medidor",medidorRoutes);
app.use("/api/medicion",medicionRoutes);
app.use("/api/reporte",reporteRoutes);

export default app;