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
const getByDayAsync = async (req, res) => {
    try {
        const {date } = req.body;
        console.log(typeof(date));
        let medidorList = [
            {date: "2022-12-25 15:26:12"},
            {date: "2022-12-25 16:26:12"},
            {date: "2022-12-25 17:26:12"},
            {date: "2022-12-25 18:26:12"},
            {date: "2022-12-25 19:26:12"},
        ];
        medidorList = medidorList.filter(meditorItem => {
            let dateString = meditorItem.date.split(" ")[0];
            return dateString === date;
        });
        console.log(medidorList);


        // let medidorList = await Medidor.findAll({
        //     order: [["date", "asc"]]
        // });
        // let obj = JSON.parse(JSON.stringify(medidorList[0]));
        // console.log(obj);
        res.json(medidorList);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    getAsync,
    getByDayAsync
}