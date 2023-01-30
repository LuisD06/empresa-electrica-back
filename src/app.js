const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


// Routes
const usuarioRoutes  = require("./routes/usuario.routes.js").router;
const medidorRoutes  = require("./routes/medidor.routes.js").router;
const medicionRoutes =  require("./routes/medicion.routes.js").router;
const reporteRoutes  = require("./routes/reporte.routes.js").router;

const app = express();

// Settings
app.set("port", 4000);
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

module.exports = {
    app
}