import app from "./app.js";
import { Server } from "ws";
import { db } from "./database/firebase.js";
import { Medicion } from "./models/Medicion.js";
import { v4 as uuidv4 } from 'uuid';

const main = () => {
    const server = require("http").createServer(app);
    const socketServer = new Server({ server: server });
    const clients = new Map();

    socketServer.on('connection', (ws) => {
    
        const id = uuidv4();
        const color = Math.floor(Math.random() * 360);
        const metadata = { id, color };

        clients.set(ws, metadata);
        const ref = db.ref("/");
        ref.on("value", (snapshot) => {
            const date = new Date();
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            const hours = ("0" + date.getHours()).slice(-2);
            const minutes = ("0" + date.getMinutes()).slice(-2);
            const seconds = ("0" + date.getSeconds()).slice(-2);
            const dateString = `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;


            Medicion.create({
                corriente: snapshot.val().Corriente,
                energia: snapshot.val().Energia,
                factor: snapshot.val().Factor,
                latitud: snapshot.val().Latitud,
                longitud: snapshot.val().Longitud,
                power: snapshot.val().Power,
                temperatura: snapshot.val().Temperatura,
                voltaje: snapshot.val().Voltaje,
                date: dateString,
                suma: snapshot.val().Suma,
                id: snapshot.val().ID
            });
            ws.send(JSON.stringify({ ...snapshot.val(), date: dateString }));
        });
        ws.on('close', () => {
            clients.delete(ws);
        });
    });
    server.listen(4000);
    // app.listen(app.get("port"));
    console.log(`Server on port ${4000}`);
}

main();