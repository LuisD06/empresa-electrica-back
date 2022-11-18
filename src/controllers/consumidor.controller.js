import { getConnection } from "./../database/database";


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
    login
};