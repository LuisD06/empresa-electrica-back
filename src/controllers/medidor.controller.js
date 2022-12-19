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
        const { date } = req.body;


        let medidorList = await Medidor.findAll({
            order: [["date", "asc"]]
        });

        const medidorResList = JSON.parse(JSON.stringify(medidorList));
        
        
        medidorList = medidorResList.filter(meditorItem => {
            let dateString = meditorItem.data.date.split(" ")[0];
            return dateString === date;
        });

        let medidorDates = medidorList.map(medidorItem => {
            const [dateValues, timeValues] = medidorItem.data.date.split(" ");
            const [year, month, day] = dateValues.split("-");
            const [hours, minutes, seconds] = timeValues.split("-");
            const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
            return ({...medidorItem, data: {...medidorItem.data, date: dateObj}});
        });



        let newList = [];
        newList = medidorDates.filter((medidorItem, index)  => 
            index === medidorDates.findIndex(
                item => item.data.date.getHours() === medidorItem.data.date.getHours()
            )
        );

        


        res.json(newList);
    } catch (error) {
        console.log(error);
        res.status(500)
        res.send(error.message);
    }
}
const getByMonthAsync = async (req, res) => {
    try {
        const { date } = req.body;


        let medidorList = await Medidor.findAll({
            order: [["date", "asc"]]
        });
        const medidorResList = JSON.parse(JSON.stringify(medidorList));
        
        
        medidorList = medidorResList.filter(meditorItem => {
            const [dateValues, timeValues] = meditorItem.data.date.split(" ");
            return dateValues.startsWith(date);
        });

        let medidorDates = medidorList.map(medidorItem => {
            const [dateValues, timeValues] = medidorItem.data.date.split(" ");
            const [year, month, day] = dateValues.split("-");
            const [hours, minutes, seconds] = timeValues.split("-");
            const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
            return ({...medidorItem, data: {...medidorItem.data, date: dateObj}});
        });

        

        let newList = [];
        newList = medidorDates.filter((medidorItem, index)  => 
            index === medidorDates.findIndex(
                item => item.data.date.getDay() === medidorItem.data.date.getDay()
            )
        );

        res.json(newList);
    } catch (error) {
        console.log(error);
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    getAsync,
    getByDayAsync,
    getByMonthAsync
}