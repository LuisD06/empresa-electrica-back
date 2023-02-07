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
    const { date, medidores } = req.body;
    let medicionList = await Medicion.findAll({
      where: {
        date: {
          ">=": date,
          "<=": date + '\uf8ff'
        },
        medidorId: {
          "in": medidores
        }
      },
      // order: [["date", "asc"]]
    });

    const medicionResList = JSON.parse(JSON.stringify(medicionList));

    if (medicionList.length !== 0) {

      let medicionDates = medicionResList.map(medicionItem => {
        const [dateValues, timeValues] = medicionItem.data.date.split(" ");
        const [year, month, day] = dateValues.split("-");
        const [hours, minutes, seconds] = timeValues.split("-");
        const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
        return ({ ...medicionItem, data: { ...medicionItem.data, date: dateObj } });
      });
      const key = 'date';

      let asigned = {}
      medidores.forEach((medidor) => {
        const medidorGroup = medicionDates.filter((medicion) => medicion.data.medidorId === medidor);
        if (medidorGroup.length !== 0) {
          asigned[medidor] = medidorGroup;
        }
      })

      let idGroups = {};
      let groupList = {};
      let groupObj = {};

      if (Object.keys(asigned).length > 1) {
        idGroups = medicionDates.reduce((prev, index) => {
          (prev[index['data']['medidorId']] = prev[index['data']['medidorId']] || []).push(index);
          return prev
        })
        console.log(idGroups);
        Object.keys(asigned).forEach((medidor) => {
          groupObj[medidor] = idGroups[medidor]
        })
        console.log(groupObj);
      }

      console.log(asigned);

      Object.keys(asigned).forEach((medidor) => {
        console.log(medidor);
        let medicionDates = asigned[medidor];
        let medicionGroups = medicionDates.reduce((prev, index) => {
          (prev[index['data'][key].getDate()] = prev[index['data'][key].getDate()] || []).push(index);
          return prev
        }, {})
        console.log(medicionGroups)
        let keys = Object.keys(medicionGroups);

        console.log(keys);

        let newList = [];
        keys.forEach(key => {
          const sortOrder = medicionGroups[key].sort((a,b) => (a.data.date < b.data.date) ? 1 : -1)
          newList.push(sortOrder[0]);
        });

        console.log(newList);

        groupList[medidor] = newList;
      });
      console.log(groupList);
      res.json(groupList);

    } else {
      res.status(400).send({
        message: "No se han econtrado registros"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500)
    res.send(error.message);
  }
}

const generateAsync = async (req, res) => {
  try {
    const { medidorId } = req.body;
    const months = ['1'];
    const year = 2023;
    months.forEach(async (month) => {
      const lastDate = new Date(year, parseInt(month), 0);
      const lastDay = lastDate.getDate();
      let sumaTotal = 0;
      for (let index = lastDay - 7; index <= lastDay; index++) {
        const date = new Date();
        const day = ("0" + index).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        sumaTotal += (Math.random() * 100) + 10;
        const dateString = `${year}-${("0"+month).slice(-2)}-${day} ${hours}-${minutes}-${seconds}`;
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
          id: 1,
          medidorId: medidorId
        });
      }
    });
    res.json({ message: 'exit' })

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