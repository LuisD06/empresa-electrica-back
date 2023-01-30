const Medidor = require("./../models/Medidor.js").Medidor
const v4 = require("uuid").v4;

const createAsync = async (req, res) => {
    try {
        const { numero, tipo, servicio, suministro, lat, lng } = req.body;
        const newMedidor = {
            numero: numero,
            tipo: tipo,
            suministro: suministro,
            lat: lat,
            lng: lng,
            servicio: servicio,
            id: v4(),
            status: 'available'
        }
        const medidorResult = Medidor.create(newMedidor);
        res.json(medidorResult);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
const getAsync = async (req, res) => {
    try {
        let medidorList = await Medidor.findAll({
            where: {
                status: {
                    '==': 'available'
                }
            }
        });
        const medidorJson = JSON.stringify(medidorList);
        const medidorObject = JSON.parse(medidorJson)
        medidorList = medidorObject.map((medidor) => medidor.data); 
        res.json(medidorList);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getBySuministroAsync = async(req,res) => {
    try {       
        const { suministro }  = req.params;
        const medidorList = await Medidor.findAll({
            where: {
                suministro: {
                    '==': suministro
                },
                status: {
                    '==': 'available'
                }
            }
        });
        console.log(medidorList);
        if (medidorList.length > 0) {
            const listObject = JSON.parse(JSON.stringify(medidorList));
            res.status(200).json({
                data: listObject
            })

        }else {
            res.status(400).send({
                message: 'No existen medidores disponibles con este suministro'
            })
        }
    } catch (error) {
        res.status(500);
        res.send({
            message: "Ha ocurrido un error inesperado"
        })
    }
}

const getInstancesByClient = async (req, res) => {
    try {
        const { usuario } = req.params;
        console.log(usuario);
        const medidorList = await Medidor.findAll({
            where: {
                usuario: {
                    '==': usuario
                }
            }
        })
        if (medidorList !== null) {
            res.status(200).json({
                data: medidorList
            });
        } else {
            res.status(400).send({
                message: 'El cliente no tiene medidores registrados'
            })
        }
    } catch (error) {
        res.status(500);
        res.send({
            message: "Ha ocurrido un error inesperado"
        })
    }
}

const methods = {
    createAsync,
    getAsync,
    getBySuministroAsync,
    getInstancesByClient
}
module.exports = {
    methods
}