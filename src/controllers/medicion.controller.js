import { Medicion } from "./../models/Medicion";

const getAsync = async (req, res) => {
  try {
    let medicionList = await Medicion.findAll({
      order: [["date", "asc"]]
    });
    const listLength = medicionList.length;
    medicionList = listLength > 10 ? medicionList.splice(listLength - 10 - 1, listLength - 1) : medicionList;
    res.json(medicionList);
  } catch (error) {
    res.status(500)
    res.send(error.message);
  }
}
const getByDayAsync = async (req, res) => {
  try {
    const { date } = req.body;


    let medicionList = await Medicion.findAll({
      order: [["date", "asc"]]
    });

    const medicionResList = JSON.parse(JSON.stringify(medicionList));


    medicionList = medicionResList.filter(meditorItem => {
      let dateString = meditorItem.data.date.split(" ")[0];
      return dateString === date;
    });

    let medicionDates = medicionList.map(medicionItem => {
      const [dateValues, timeValues] = medicionItem.data.date.split(" ");
      const [year, month, day] = dateValues.split("-");
      const [hours, minutes, seconds] = timeValues.split("-");
      const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
      return ({ ...medicionItem, data: { ...medicionItem.data, date: dateObj } });
    });



    let newList = [];
    newList = medicionDates.filter((medicionItem, index) =>
      index === medicionDates.findIndex(
        item => item.data.date.getHours() === medicionItem.data.date.getHours()
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


    let medicionList = await Medicion.findAll({
      order: [["date", "asc"]]
    });
    const medicionResList = JSON.parse(JSON.stringify(medicionList));


    medicionList = medicionResList.filter(meditorItem => {
      const [dateValues, timeValues] = meditorItem.data.date.split(" ");
      return dateValues.startsWith(date);
    });

    let medicionDates = medicionList.map(medicionItem => {
      const [dateValues, timeValues] = medicionItem.data.date.split(" ");
      const [year, month, day] = dateValues.split("-");
      const [hours, minutes, seconds] = timeValues.split("-");
      const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
      return ({ ...medicionItem, data: { ...medicionItem.data, date: dateObj } });
    });



    let newList = [];
    newList = medicionDates.filter((medicionItem, index) =>
      index === medicionDates.findIndex(
        item => item.data.date.getDay() === medicionItem.data.date.getDay()
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