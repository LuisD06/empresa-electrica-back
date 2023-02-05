
const Usuario = require("./../models/Usuario.js").Usuario;
const Medidor = require("./../models/Medidor.js").Medidor;
const v4 = require("uuid").v4;
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
        const usuarioExiste = await Usuario.findOne({
            where: {
                cedula: {
                    '==': cedula
                }
            }
        })
        console.log("Usuario existente:");
        console.log(usuarioExiste);
        if (usuarioExiste === null) {
            const id = v4();
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
                        '==': medidorId
                    }
                }
            });
            console.log(usuarioEntity);
            const medidorUpdate = await medidor.update({
                usuario: usuarioObject.data.id,
                lat: lat,
                lng: lng,
                status: 'unavailable',

            })
            res.json(usuarioEntity);
        } else {
            console.log(400);
            res.status(400);
            res.send({message: 'El usuario con esa cédula ya está registrado'})
        }
    
    } catch (error) {
        console.log(500);
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
        const id = v4();
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
        const { cedula, clave } = req.body;

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
            const medidorentity = await Medidor.findAll({
                where: {
                    usuario: {
                        '==': usuarioObject.id
                    }
                }
            })
            const medidorObject = JSON.parse(JSON.stringify(medidorentity));
            usuarioResponse = { ...usuarioObject, medidores: medidorObject };
        } else {
            usuarioResponse = usuarioObject;
        }
        usuarioResponse = { data: usuarioResponse, status: true };
        return res.json(usuarioResponse);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const verifyExists = async (req, res) => {
    try {
        const { cedula } = req.body;
        const usuarioEntity = await Usuario.findOne({
            where: {
                cedula: {
                    '==':cedula
                }
            }
        });
        console.log(usuarioEntity);
        if (usuarioEntity === null) {
            res.status(200).send({message: true});
        }else {
            res.status(200).send({message: false});
        }
    } catch (error) {
        res.status(500);
        res.send({message: "Ha ocurrido un error inesperado"});
    }
}

const getByCedula = async (req, res) => {
    try {
        console.log(req.params);
        const { cedula } = req.params;
        console.log(cedula);

        const usuarioEntity = await Usuario.findOne({
            where: {
                cedula: {
                    '==' : cedula
                }
            }
        });
        if ( usuarioEntity === null ) {
            res.status(400).send({
                message: 'No existe un usuario con la cédula ingresada'
            });
        }else {
            const usuarioObject = JSON.parse(JSON.stringify(usuarioEntity));
            const medidorList = await Medidor.findAll({
                where: {
                    usuario: {
                        '==': usuarioObject.data.id
                    }
                }
            });

            const userRes = {
                usuario: usuarioObject,
                medidores: medidorList
            }

            res.status(200).json({
                data: userRes
            })

        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.send({message: 'Ha ocurrido un problema inesperado'});
    }
}

const addMedidor = async (req, res) => {
    try {
        const { usuario, direccion, medidor } = req.body;
        const [lat, lng] = direccion.split(',');

        const medidorEntity = await Medidor.findOne({
            where: {
                id: {
                    '==': medidor
                }
            }
        })

        const medidorUpdate = await medidorEntity.update({
            usuario: usuario,
            lat: lat,
            lng: lng,
            status: 'unavailable'

        }) 

        const usuarioEntity = await Usuario.findOne({
            where: {
                id: {
                    '==': usuario
                }
            }
        })
        res.status(200).json(usuarioEntity);

    } catch (error) {
        res.status(500);
        res.send({
            message: "Ha ocurrido un error inesperado"
        })
    }
}
const methods = {
    createAsync,
    loginAsync,
    createOperatorAsync,
    verifyExists,
    getByCedula,
    addMedidor
}

module.exports = {
    methods
}