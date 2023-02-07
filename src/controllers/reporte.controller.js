const Reporte = require('./../models/Reporte.js').Reporte
const Medidor = require('./../models/Medidor.js').Medidor
const Usuario = require('./../models/Usuario.js').Usuario
const Medicion = require('./../models/Medicion.js').Medicion
const db = require('./../database/firebase.js').db
const v4 = require("uuid").v4
const getByMonth = async (req, res) => {
  try {
    const { date } = req.body;
    const [year, month] = date.split("-");
    console.log(year, month);
    
    let initialDate = new Date(year, month -1,18);
    let endDate = new Date(year, month -1,19);

    initialDate = initialDate.toLocaleString();
    endDate = endDate.toLocaleString();

    let [initialFullDate, initialTime] = initialDate.split(' ');
    initialFullDate = initialFullDate.substr(0,initialFullDate.length - 1);

    let [endFullDate, endTime] = endDate.split(' ');
    endFullDate = endFullDate.substr(0, endFullDate.length - 1);

    const [newDay, newMonth, newYear] = initialFullDate.split('/');
    const [newEndDay, newEndMonth, newEndYear] = endFullDate.split('/');
    const startDateStr = `${newYear}-${newMonth}-${newDay} ${initialTime}`;
    const endDateStr = `${newEndYear}-${newEndMonth}-${newEndDay} ${endTime}`;

    console.log(startDateStr);
    console.log(endDateStr);

    let reportList = await Medidor.findAll({
      where: {
        date: {
          '>=': startDateStr,
          '<=': endDateStr
        }
      },
      order: [["date", "desc"]]
    });
    res.json(reportList);
  } catch (error) {
    res.status(500);
    res.send(error.message);

  }
}
const createReport = async (req, res) => {
  try {
    const { id, date } = req.body;
    const reportExists = await Reporte.findOne({
      where: {
        fecha: {
          '==':date
        }
      }
    })
    if (reportExists === null) {
      const usuarioEntity = await Usuario.findOne({
        where: {
          cedula: {
            '==': id
          }
        }
      })
      const usuarioObject = JSON.parse(JSON.stringify(usuarioEntity)).data;
      const medidorEntity = await Medidor.findOne({
        where: {
          usuario: usuarioObject.id 
        }
      })
      const medidorObject = JSON.parse(JSON.stringify(medidorEntity)).data;
      const idReporte = v4();
      const ref = db.ref('/');
      const dataEntity = await ref.once('value').then((snapshot) => {
        return snapshot;
      })
      const data = dataEntity.val();
      const report = {
        id: idReporte,
        cedula: usuarioObject.cedula,
        correo: usuarioObject.correo,
        direccion: usuarioObject.direccion,
        telefono: usuarioObject.telefono,
        idMedidor: medidorObject.id,
        latlng: `${medidorObject.lat},${medidorObject.lng}`,
        numeroMedidor: medidorObject.numero,
        servicio: medidorObject.servicio,
        tipoMedidor: medidorObject.tipo,
        suministro: medidorObject.suministro,
        consumo: data.Suma,
        total: (0.092 * data.Suma) / 100,
        fecha: date
      }
      const reportEntity = await Reporte.create(report);
      res.json(reportEntity);
    }else {
      res.status(400).json({message: 'No se puede crear dos reportes para una misma fecha'})
    }
  } catch (error) {
    res.status(500);
    res.json({message: 'Ha ocurrido un error inesperadp'});
  }
}
const createReportByMedidor = async (req, res) => {
  try {
    const { numero, date } = req.body;
    const reportExists = await Reporte.findOne({
      where: {
        fecha: {
          '==': date
        },
        numeroMedidor: {
          "==": numero
        }
      }
    })
    if (reportExists === null) {
      const medidor = await Medidor.findOne({
        where: {
          numero: numero
        }
      })
      if (medidor !== null) {
        const medidorObject = JSON.parse(JSON.stringify(medidor)).data;
        const usuarioEntity = await Usuario.findOne({
          where: {
            id: {
              '==': medidorObject.usuario
            }
          }
        })
        const usuarioObject = JSON.parse(JSON.stringify(usuarioEntity)).data;
        const idReporte = v4();
        console.log(medidorObject);
        const medicionList = await Medicion.findAll({
          where: {
            medidorId: {
              "==": medidorObject.id
            },
            date: {
              ">=": date,
              "<=": date + '\uf8ff'
            }
          }
        })

        const medicionListObject = JSON.parse(JSON.stringify(medicionList));

        const orderedList = medicionListObject.sort((a,b) => (a.data.date < b.data.date) ? 1 : -1);
        console.log(orderedList);
        
        const data = orderedList.at(0).data;
        const report = {
          id: idReporte,
          cedula: usuarioObject.cedula,
          correo: usuarioObject.correo,
          direccion: usuarioObject.direccion,
          telefono: usuarioObject.telefono,
          idMedidor: medidorObject.id,
          latlng: `${medidorObject.lat},${medidorObject.lng}`,
          numeroMedidor: medidorObject.numero,
          servicio: medidorObject.servicio,
          tipoMedidor: medidorObject.tipo,
          suministro: medidorObject.suministro,
          consumo: data.suma,
          total: (0.092 * data.suma) / 100,
          fecha: date
        }
        const reportEntity = await Reporte.create(report);
        console.log(reportEntity);
        res.json(reportEntity);
      }
    }else {
      res.status(400).json({message: 'No se puede crear dos reportes para una misma fecha'})
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({message: 'Ha ocurrido un error inesperado'});
  }
}
const getAll = async (req, res) => {
  try {
    const response = await Reporte.findAll({});
    const reportListEntity = JSON.parse(JSON.stringify(response));
    const reportList = reportListEntity.map((report) => report.data);
    res.json(reportList);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

const methods = {
  getByMonth,
  createReport,
  getAll,
  createReportByMedidor
}

module.exports = {
  methods
}