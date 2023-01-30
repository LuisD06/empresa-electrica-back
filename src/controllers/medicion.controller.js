const Medicion = require("./../models/Medicion.js").Medicion

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

    console.log(date);

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

    const key = 'date';

    const medicionGroups = medicionDates.reduce((prev, index) => {
      (prev[index['data'][key].getDate()] = prev[index['data'][key].getDate()] || []).push(index);
      return prev
    }, {});

    const keys = Object.keys(medicionGroups);

    console.log(keys);

    let newList = [];
    keys.forEach(key => {
      newList.push(medicionGroups[key][0]);
    });

    console.log(newList);

    res.json(newList);
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send(error.message);
  }
}

const generateAsync = async (req, res) => {
  try {
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const year = 2022;
    let sumaTotal = 0;
    months.forEach(async (month) => {
      const lastDate = new Date(year, parseInt(month), 0 );
      const lastDay = lastDate.getDate();
      console.log(lastDay);
      for (let index = 1; index <= lastDay; index++) {
        const date = new Date();
        const day = index;
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        sumaTotal+= (Math.random() * 100) +  10;
        const dateString = `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
        const med = await Medicion.create({
          corriente: 0,
          date: dateString,
          energia: "0.00000842",
          factor: 0,
          latitud: '-0.2540920019',
          longitud: '-78.5105972290',
          power: 0,
          temperatura: 49,
          voltaje: 0,
          suma: sumaTotal,
          id: 1
        });
      }
    });
    res.json({message: 'exit'})

  } catch (error) {
    res.status(500);
    res.json({
      message: 'Ha ocurrido un error inesperado'
    });
  }
}

const methods = {
  getAsync,
  getByDayAsync,
  getByMonthAsync,
  generateAsync
}
module.exports = {
  methods
}