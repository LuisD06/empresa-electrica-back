import { getConnection } from "./../database/database";
import { db } from "./../database/firebase";
import { Medidor } from "./../models/Medidor";

const createMedidor = async (req,res) => {
    try {
        const newMedidor = await Medidor.create({
            corriente: 15
        })
        res.json(newMedidor);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const getData = async (req, res) => {
    try {
        console.log("Firebase");
        var ref = db.ref("/");
        ref.on("value", (snapshot) => {

            return res.json(snapshot.val());
        });

    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        if (usuario === undefined || contrasena === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all field" });
        }
        const connection = await getConnection();
        const resLista = await connection.query(
            "SELECT * FROM consumidor WHERE cedula = ? AND contrasena = ?",
            [usuario, contrasena]
        );
        if (resLista.length == 0) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }
        return res.json({status: true, message: ""});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getConsumidor = async (req, res) => {
    try {
        console.log("get");
        const { id } = req.params;
        if(id === undefined){
            res.status(400).json({ message: "Bad Request. Please fill all field" });
        }
        const connection = await getConnection();
        const result = await connection.query(
            "SELECT * FROM consumidor WHERE id = ?",
            id
        );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addConsumidor = async (req, res) => {
    try {
        const { nombre, cedula, direccion, correo, telefono, tipo, contrasena } = req.body;


        const consumidor = { nombre, cedula, direccion, correo, telefono, tipo, contrasena };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO consumidor SET ?", consumidor);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const methods = {
    getConsumidor,
    addConsumidor,
    login,
    getData,
    createMedidor
};