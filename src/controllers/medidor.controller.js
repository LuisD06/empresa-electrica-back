import { Medidor } from "./../models/Medidor";
import { v4 as uuidv4 } from 'uuid';

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
            id: uuidv4(),
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

export const methods = {
    createAsync,
    getAsync
}