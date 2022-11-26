import { Usuario } from "./../models/Usuario";
const createAsync = async (req, res) => {
    try {
        const { usuario } = req.body;
        const usuarioEntity = await Usuario.create({
            ...usuario 
        })
        res.json(usuarioEntity);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const loginAsync = async (req, res) => {
    try {
        const { cedula, clave }  = req.body;

        if (cedula === null || clave === null) {
            return res.status(400).send();
        }
        
        const usuarioEntity = await Usuario.findOne({
            where: {
                cedula: {
                    '==': cedula
                },
                clave: {
                    '==': clave
                }
            }
        });
        if (usuarioEntity === null) {
            return res.status(404).send();
        }
        let usuarioResponse = JSON.parse(JSON.stringify(usuarioEntity));
        usuarioResponse = {...usuarioResponse, status: true};
        return res.json(usuarioResponse);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    createAsync,
    loginAsync
}