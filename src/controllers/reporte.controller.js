import { Reporte } from './../models/Reporte';
import { Medidor } from './../models/Medidor';
import { Usuario } from './../models/Usuario';
import { db } from './../database/firebase';
import { v4 as uuidv4 } from 'uuid';
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
    const idReporte = uuidv4();
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
  } catch (error) {
    res.status(500);
    res.send(error.message);
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

export const methods = {
  getByMonth,
  createReport,
  getAll
}