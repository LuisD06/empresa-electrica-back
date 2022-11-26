import { Medidor } from "./../models/Medidor";

const getAsync = async (req, res) => {
    try {
        let medidorList = await Medidor.findAll({
            order: [["date", "asc"]]
        });
        const listLength = medidorList.length;
        medidorList = listLength > 10 ? medidorList.splice(listLength-10-1, listLength-1) : medidorList;
        res.json(medidorList);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    getAsync
}