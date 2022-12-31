import { Usuario } from "./../models/Usuario";
import { Medidor } from "./../models/Medidor";
import { v4 as uuidv4 } from 'uuid';
const createAsync = async (req, res) => {
    try {
        const { 
            cedula, 
            clave, 
            correo, 
            direccion, 
            nombre, 
            telefono, 
            tipo,
            medidorId 
        } = req.body;
        const id = uuidv4();
        const [lat, lng] = direccion.split(',');
        const newUsuario = {
            id,
            cedula,
            clave,
            correo,
            direccion,
            nombre,
            telefono,
            tipo
        }
        const usuarioEntity = await Usuario.create(newUsuario);
        const usuarioObject = JSON.parse(JSON.stringify(usuarioEntity));
        const medidor = await Medidor.findOne({
            where: {
                id: {
                    '==':medidorId
                }
            }
        });
        const medidorUpdate = await medidor.update({
            usuario: usuarioObject.data.id,
            lat: lat,
            lng: lng,
            status: 'unavailable',

        })
        console.log(medidorUpdate);
        res.json(usuarioEntity);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}
const createOperatorAsync = async (req, res) => {
    try {
        const { 
            cedula, 
            clave, 
            correo, 
            direccion, 
            nombre, 
            telefono, 
            tipo
        } = req.body;
        const id = uuidv4();
        const [lat, lng] = direccion.split(',');
        const newUsuario = {
            id,
            cedula,
            clave,
            correo,
            direccion,
            nombre,
            telefono,
            tipo
        }
        const usuarioEntity = await Usuario.create(newUsuario);
        const usuarioObject = JSON.parse(JSON.stringify(usuarioEntity));
        res.json(usuarioObject);
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
        const usuarioObject = JSON.parse(JSON.stringify(usuarioEntity)).data;
        let usuarioResponse = {};
        if (usuarioObject.tipo === 'cliente') {
            const medidorentity = await Medidor.findOne({
                where: {
                    usuario: {
                        '==': usuarioObject.id
                    }
                }
            })
            const medidorObject = JSON.parse(JSON.stringify(medidorentity)).data;
            usuarioResponse = {...usuarioObject, medidor: medidorObject};
        }else {
            usuarioResponse = usuarioObject;
        }
        usuarioResponse = {data: usuarioResponse, status: true};
        return res.json(usuarioResponse);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    createAsync,
    loginAsync,
    createOperatorAsync
}