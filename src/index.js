const app = require("./app.js").app;
const Server = require("ws").Server;
const db = require("./database/firebase.js").db
const Medicion = require("./models/Medicion.js").Medicion;
const v4 = require('uuid').v4;

const main = () => {
    const server = require("http").createServer(app);
    const socketServer = new Server({ server: server });
    const clients = new Map();

    socketServer.on('connection', (ws) => {
    
        const id = v4();
        const color = Math.floor(Math.random() * 360);
        const metadata = { id, color };

        clients.set(ws, metadata);
        const ref = db.ref("/");
        ref.on("value", (snapshot) => {
            const date = new Date(new Date().toLocaleString('es-EC'));
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            const hours = ("0" + date.getHours()).slice(-2);
            const minutes = ("0" + date.getMinutes()).slice(-2);
            const seconds = ("0" + date.getSeconds()).slice(-2);
            const dateString = `${year}-${day}-${month} ${hours}-${minutes}-${seconds}`;

            console.log(date);


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
                id: snapshot.val().ID,
                medidorId: "c3f3604b-85f8-4e04-ad2f-f895cbf7090b"
            });

            console.log("Data saved");

            ws.send(JSON.stringify({ ...snapshot.val(), date: dateString }));
        });
        ws.on('close', () => {
            clients.delete(ws);
        });
    });
    server.listen(4001);
    // app.listen(app.get("port"));
    console.log(`Server on port ${4001}`);
}

main();